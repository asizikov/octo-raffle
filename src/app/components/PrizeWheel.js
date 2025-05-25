'use client';

import { useState, useEffect, useRef } from 'react';

const PrizeWheel = ({ participants, onSelectWinner, winningNumber }) => {
  const canvasRef = useRef(null);
  const arrowRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // Draw the wheel on the canvas
  useEffect(() => {
    if (!canvasRef.current || participants.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate the angle for each slice
    const sliceAngle = (2 * Math.PI) / participants.length;
    
    // Colors for the wheel slices - GitHub theme colors
    const colors = [
      '#2188ff', '#79b8ff', '#c8e1ff', '#0366d6', 
      '#005cc5', '#044289', '#032f62', '#05264c',
      '#6f42c1', '#d1bcf9', '#8a63d2', '#5a32a3'
    ];
    
    // Draw the wheel slices
    participants.forEach((participant, index) => {
      const startAngle = index * sliceAngle + rotation;
      const endAngle = (index + 1) * sliceAngle + rotation;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Fill with a color
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      
      // Add a border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Add number text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px Arial';
      // Show number if participant is a number, or ID if object, or fallback to string
      let label = participant;
      if (typeof participant === 'object' && participant !== null) {
        label = participant.id || participant.name || '';
      }
      ctx.fillText(label.toString(), radius - 30, 8);
      ctx.restore();
    });
    
    // Draw center circle - GitHub Octocat style
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#24292e';
    ctx.fill();
    
    // Draw Octocat silhouette (simplified)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(centerX - 7, centerY - 5, 4, 0, 2 * Math.PI); // left eye
    ctx.arc(centerX + 7, centerY - 5, 4, 0, 2 * Math.PI); // right eye
    ctx.fill();
    
  }, [participants, rotation]);

  // Function to spin the wheel
  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Random number of rotations (5-10) plus a random angle
    const targetRotations = 5 + Math.random() * 5;
    const targetAngle = Math.random() * 2 * Math.PI;
    const totalRotation = targetRotations * 2 * Math.PI + targetAngle;
    
    // Animation duration
    const duration = 5000; // ms
    const start = performance.now();
    
    // Animation function
    const animate = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for slowing down
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);
      const currentRotation = totalRotation * easeOut(progress);
      
      setRotation(currentRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        
        // Winner calculation:
        // 1. Calculate the angle of each slice
        const sliceAngle = (2 * Math.PI) / participants.length;
        
        // 2. Get the effective rotation (normalized between 0 and 2π)
        const normalizedRotation = currentRotation % (2 * Math.PI);
        
        // 3. The pointer is fixed at 12 o'clock (3π/2 radians)
        const pointerAngle = (3 * Math.PI / 2 - normalizedRotation + 2 * Math.PI) % (2 * Math.PI);
        
        // 4. Determine which slice number is at the pointer position
        let selectedIndex = Math.floor((pointerAngle + sliceAngle / 2) / sliceAngle) % participants.length;
        
        // Adjust for rounding errors or edge cases
        if (selectedIndex < 0) {
          selectedIndex += participants.length;
        }
        
        const winner = participants[selectedIndex];
        
        onSelectWinner(winner);
      }
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <div className="relative mx-auto flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center">
        <canvas 
          ref={canvasRef}
          width={750}
          height={750}
          className="border-4 border-gray-300 rounded-full shadow-lg max-w-full max-h-full"
          style={{ width: 'auto', height: 'auto' }}
        />
        
        {/* Arrow pointer - positioned at the top center above the wheel, pointing down */}
        <div 
          className="absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-full rotate-0 z-10"
          ref={arrowRef}
        >
          <div className="w-8 h-12 relative">
            <div 
              className="absolute top-0 left-0 w-0 h-0"
              style={{ 
                borderLeft: '16px solid transparent',
                borderRight: '16px solid transparent',
                borderTop: '40px solid #e6305a'
              }}
            />
            <div 
              className="absolute top-0 left-0 w-0 h-0"
              style={{ 
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderTop: '32px solid #f85a7c',
                marginLeft: '2px',
                marginTop: '2px'
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center flex-shrink-0">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`
            px-8 py-4 rounded-full font-bold text-white 
            shadow-lg transform transition-all duration-300 
            flex items-center justify-center space-x-3 mx-auto
            ${isSpinning 
              ? 'bg-gray-500 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105'
            }
          `}
        >
          <span className="text-2xl">{isSpinning ? '⏳' : '🔄'}</span>
          <span>{isSpinning ? 'Spinning...' : 'Spin the Wheel'}</span>
        </button>
      </div>
    </div>
  );
};

export default PrizeWheel;
