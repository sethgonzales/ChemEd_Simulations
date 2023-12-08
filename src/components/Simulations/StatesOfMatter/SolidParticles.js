import React, { useEffect, useRef } from 'react';

const SolidParticles = () => {
  const canvasRef = useRef(null);
  const particleCount = 10;
  const particleSize = 20;
  const particleGap = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const columns = Math.floor(canvasWidth / (particleSize + particleGap));
    const rows = Math.floor(canvasHeight / (particleSize + particleGap));
    const particles = [];

    // Create particles in a square lattice
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * (particleSize + particleGap) + particleGap / 2;
        const y = row * (particleSize + particleGap) + particleGap / 2;
        particles.push({ x, y });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.fillRect(particle.x, particle.y, particleSize, particleSize);
        ctx.closePath();
      });
    }

    function vibrateParticles() {
      particles.forEach(particle => {
        particle.x += Math.random() - 0.5;
        particle.y += Math.random() - 0.5;
      });

      drawParticles();
      requestAnimationFrame(vibrateParticles);
    }

    drawParticles();
    vibrateParticles();
  }, []);

  return (
    <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid #000' }}></canvas>
  );
};

export default SolidParticles;
