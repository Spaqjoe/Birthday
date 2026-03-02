import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlowDetection } from "@/hooks/useBlowDetection";

interface MicrophoneControlProps {
  onBlow: () => void;
  disabled?: boolean;
}

export function MicrophoneControl({ onBlow, disabled }: MicrophoneControlProps) {
  const { supported, listening, error, start, stop } = useBlowDetection({ onBlow });

  const handleClick = async () => {
    if (disabled) return;
    if (listening) stop();
    else await start();
  };

  if (!supported) {
    return (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>
          Your browser doesn&apos;t seem to support microphone access, but you can still
          tap <span className="font-semibold">&quot;Relight candles&quot;</span> and
          imagine blowing them out for Pelumi.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={listening ? "shadow-lg shadow-primary/40 animate-pulse" : "shadow-md shadow-primary/25"}
      >
        {disabled ? (
          <>
            <MicOff className="size-4" />
            Candles are already out
          </>
        ) : listening ? (
          <>
            <Volume2 className="size-4" />
            Listening… blow toward your mic
          </>
        ) : (
          <>
            <Mic className="size-4" />
            Enable microphone to blow out candles
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        We only listen while this page is open and you&apos;ve turned the microphone on.
      </p>

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
