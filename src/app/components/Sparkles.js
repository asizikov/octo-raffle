'use client';

const pseudoRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const Sparkles = ({ count = 30, colors = ['#FFD700', '#FFA500', '#FF6347'] }) => {
  const sparkles = Array.from({ length: count }, (_, i) => {
    const baseSeed = i + count * 100 + colors.length * 10;

    return {
      id: i,
      size: pseudoRandom(baseSeed + 1) * 10 + 5,
      left: `${pseudoRandom(baseSeed + 2) * 100}%`,
      top: `${pseudoRandom(baseSeed + 3) * 100}%`,
      animationDuration: `${pseudoRandom(baseSeed + 4) * 2 + 1}s`,
      animationDelay: `${pseudoRandom(baseSeed + 5) * 0.5}s`,
      color: colors[Math.floor(pseudoRandom(baseSeed + 6) * colors.length)],
    };
  });

  return (
    <>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-ping"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            left: sparkle.left,
            top: sparkle.top,
            backgroundColor: sparkle.color,
            borderRadius: '50%',
            opacity: 0.7,
            animationDuration: sparkle.animationDuration,
            animationDelay: sparkle.animationDelay,
          }}
        />
      ))}
    </>
  );
};

export default Sparkles;
