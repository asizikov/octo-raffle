'use client';

import { useState, useEffect } from 'react';

const Sparkles = ({ count = 30, colors = ['#FFD700', '#FFA500', '#FF6347'] }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const newSparkles = [];
    
    for (let i = 0; i < count; i++) {
      newSparkles.push({
        id: i,
        size: Math.random() * 10 + 5,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 1}s`,
        animationDelay: `${Math.random() * 0.5}s`,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setSparkles(newSparkles);
  }, [count, colors]);

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
