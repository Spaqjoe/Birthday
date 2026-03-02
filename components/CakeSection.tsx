import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { BirthdayCake } from "@/components/BirthdayCake";
import { ConfettiOverlay } from "@/components/ConfettiOverlay";
import { MicrophoneControl } from "@/components/MicrophoneControl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function CakeSection() {
  const router = useRouter();
  const [candlesLit, setCandlesLit] = useState(true);
  const [hasBlownOut, setHasBlownOut] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const startRedirectCountdown = () => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    setCountdown(3);

    intervalRef.current = window.setInterval(() => {
      setCountdown((current) => {
        if (current == null) return null;
        if (current <= 1) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          timeoutRef.current = window.setTimeout(() => {
            void router.push("/wish");
          }, 450);
          return 1;
        }
        return current - 1;
      });
    }, 1000);
  };

  const handleBlowDetected = () => {
    if (!candlesLit || isRedirecting) return;
    setCandlesLit(false);
    setHasBlownOut(true);
    startRedirectCountdown();
  };

  const handleRelight = () => {
    if (isRedirecting) return;
    setCandlesLit(true);
    setHasBlownOut(false);
  };

  return (
    <section aria-label="Interactive birthday cake for Pelumi" className="relative">
      {hasBlownOut && <ConfettiOverlay />}

      {countdown !== null && (
        <div className="countdown-overlay" aria-live="assertive" aria-atomic="true">
          <div className="countdown-overlay-card">
            <p className="countdown-number">{countdown}</p>
            <p className="countdown-subtitle">Opening your birthday card…</p>
          </div>
        </div>
      )}

      <Card className="relative z-10 overflow-hidden border-pink-100 bg-white/80 backdrop-blur-sm shadow-xl">
        <div className="grid gap-0 md:grid-cols-[1.1fr_minmax(0,1fr)]">
          {/* Cake side */}
          <div className="flex flex-col items-center justify-center p-8 md:border-r border-border">
            <BirthdayCake lit={candlesLit} candleCount={5} />
          </div>

          {/* Controls side */}
          <div className="flex flex-col justify-center p-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Blow out the candles</CardTitle>
              <CardDescription>
                Make a wish, then blow out the candles to celebrate in a magical way.
              </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-5 pt-5">
              <p className="text-sm text-muted-foreground">
                Take a deep breath, think of your wish, then tap the button below.
                When you blow gently toward your microphone the candles will go out.
              </p>

              <MicrophoneControl
                onBlow={handleBlowDetected}
                disabled={!candlesLit || isRedirecting}
              />

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRelight}
                  disabled={isRedirecting}
                >
                  Relight candles
                </Button>

                {hasBlownOut && (
                  <p className="text-xs text-primary font-medium">
                    Candles out! May all of Pelumi&apos;s wishes come true. ✨
                  </p>
                )}

                {!candlesLit && !hasBlownOut && (
                  <p className="text-xs text-muted-foreground">
                    Tap &quot;Relight candles&quot; to try again.
                  </p>
                )}
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </section>
  );
}
