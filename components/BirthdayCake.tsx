import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BirthdayCakeProps {
  lit: boolean;
  candleCount?: number;
}

export function BirthdayCake({ lit, candleCount = 5 }: BirthdayCakeProps) {
  const candles = Array.from({ length: candleCount }, (_, i) => i);
  const candleSlots = candles.map((index) => {
    const ratio = candleCount === 1 ? 0.5 : index / (candleCount - 1);
    const x = 20 + ratio * 60;
    const arcLift = Math.sin(Math.PI * ratio) * 16;
    const y = 17 - arcLift;
    const tilt = (ratio - 0.5) * 8;

    return { x, y, tilt, index };
  });

  return (
    <div className="cake-stage">
      <div className="cake-plate-shadow" />

      <div className="cake-art-wrapper">
        <svg
          className="cake-art"
          viewBox="0 0 360 260"
          role="img"
          aria-label="Birthday cake illustration"
        >
          <defs>
            <linearGradient id="cakeBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe4ec" />
              <stop offset="55%" stopColor="#ffb4c7" />
              <stop offset="100%" stopColor="#f97992" />
            </linearGradient>
            <linearGradient id="cakeBand" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff8aa8" />
              <stop offset="50%" stopColor="#ffd27a" />
              <stop offset="100%" stopColor="#ff8aa8" />
            </linearGradient>
            <radialGradient id="cakeTop" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#fffaf1" />
              <stop offset="100%" stopColor="#ffd4dd" />
            </radialGradient>
          </defs>

          <ellipse cx="180" cy="226" rx="140" ry="18" className="cake-base" />
          <rect
            x="62"
            y="76"
            width="236"
            height="128"
            rx="58"
            fill="url(#cakeBody)"
            className="cake-body-shell"
          />
          <ellipse cx="180" cy="78" rx="118" ry="36" fill="url(#cakeTop)" />
          <path
            d="M72 84 C102 112 120 70 146 95 C172 118 196 68 220 95 C242 118 268 72 290 93 L290 108 L72 108 Z"
            className="cake-icing-drip"
          />
          <rect x="74" y="118" width="212" height="25" rx="12" fill="url(#cakeBand)" />
          <rect x="74" y="150" width="212" height="25" rx="12" className="cake-mid-band" />
          <rect x="74" y="183" width="212" height="14" rx="7" className="cake-bottom-band" />
        </svg>

        <div className="cake-candle-layer" aria-hidden="true">
          {candleSlots.map((slot) => (
            <div
              key={slot.index}
              className="cake-candle"
              style={
                {
                  left: `${slot.x}%`,
                  top: `${slot.y}%`,
                  "--candle-tilt": `${slot.tilt}deg`,
                  "--candle-delay": `${slot.index * 0.08}s`,
                } as CSSProperties
              }
            >
              <span className="cake-candle-stick" />
              <span className="cake-candle-wick" />
              <span className={cn("cake-flame", lit ? "cake-flame-lit" : "cake-flame-out")}>
                <span className="cake-flame-glow" />
                <span className="cake-flame-core" />
              </span>
              <span className={cn("cake-smoke", lit ? "cake-smoke-hidden" : "cake-smoke-show")}>
                <span />
                <span />
                <span />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
