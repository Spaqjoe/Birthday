import { useCallback, useEffect, useRef, useState } from "react";

interface UseBlowDetectionOptions {
  onBlow: () => void;
}

interface BlowDetectionState {
  supported: boolean;
  listening: boolean;
  error: string | null;
  start: () => Promise<void>;
  stop: () => void;
}

export function useBlowDetection(
  options: UseBlowDetectionOptions
): BlowDetectionState {
  const { onBlow } = options;

  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const checkSupport = () => {
      const canUseMediaDevices =
        typeof window !== "undefined" &&
        typeof navigator !== "undefined" &&
        !!navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === "function";

      setSupported(canUseMediaDevices);
    };

    animationFrameId = window.requestAnimationFrame(checkSupport);

    return () => {
      if (animationFrameId != null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setListening(false);
  }, []);

  const start = useCallback(async () => {
    if (!supported || listening) return;
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      streamRef.current = stream;

      const AudioContextCtor =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextCtor();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.35;
      source.connect(analyser);
      analyserRef.current = analyser;

      setListening(true);

      let consecutiveHighEnergyFrames = 0;
      let smoothedRms = 0;
      let baselineRms = 8;
      const framesThreshold = 4;
      let calibrationFrames = 24;

      const detect = () => {
        if (!analyserRef.current) return;

        const bufferLength = analyserRef.current.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteTimeDomainData(dataArray);

        let sumSquares = 0;
        let minValue = 255;
        let maxValue = 0;
        for (let i = 0; i < bufferLength; i++) {
          const sample = dataArray[i];
          if (sample < minValue) minValue = sample;
          if (sample > maxValue) maxValue = sample;
          const value = sample - 128;
          sumSquares += value * value;
        }

        const rms = Math.sqrt(sumSquares / bufferLength);
        const peakToPeak = maxValue - minValue;
        smoothedRms = smoothedRms === 0 ? rms : smoothedRms * 0.75 + rms * 0.25;

        if (calibrationFrames > 0) {
          baselineRms = baselineRms * 0.85 + smoothedRms * 0.15;
          calibrationFrames -= 1;
        } else {
          baselineRms = baselineRms * 0.96 + smoothedRms * 0.04;
        }

        const dynamicRmsThreshold = Math.max(14, baselineRms * 2.1);
        const dynamicPeakThreshold = Math.max(26, baselineRms * 3.2);
        const detectedBlow =
          smoothedRms > dynamicRmsThreshold || peakToPeak > dynamicPeakThreshold;

        if (detectedBlow) {
          consecutiveHighEnergyFrames += 1;
        } else {
          consecutiveHighEnergyFrames = 0;
        }

        if (consecutiveHighEnergyFrames >= framesThreshold) {
          onBlow();
          stop();
          return;
        }

        rafIdRef.current = requestAnimationFrame(detect);
      };

      rafIdRef.current = requestAnimationFrame(detect);
    } catch (err) {
      console.error(err);
      setError(
        "We couldn’t access your microphone. Please check your browser permissions and try again."
      );
      stop();
    }
  }, [listening, onBlow, stop, supported]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    supported,
    listening,
    error,
    start,
    stop,
  };
}
