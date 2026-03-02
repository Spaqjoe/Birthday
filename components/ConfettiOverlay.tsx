const CONFETTI_PIECES = Array.from({ length: 80 }, (_, index) => ({
  id: index,
  left: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 3 + Math.random() * 2,
  hue: 300 + Math.random() * 80,
}));

export function ConfettiOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      {CONFETTI_PIECES.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            backgroundColor: `hsl(${piece.hue} 85% 65%)`,
          }}
        />
      ))}
    </div>
  );
}

