import React, { useEffect, useRef } from 'react';

const SolidParticles = () => {
  const canvasRef = useRef(null);
  const gridSize = 20;
  const particleSize = 9;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions after the component has mounted
    canvas.width = 200;
    canvas.height = 200;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const columns = Math.floor(canvasWidth / gridSize);
    const rows = Math.floor(canvasHeight / gridSize);
    const grid = Array.from({ length: columns }, () => Array.from({ length: rows }, () => null));

    function drawParticles() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Render particles within cells
      ctx.fillStyle = '#fff';
      grid.forEach((column, x) => {
        column.forEach((particle, y) => {
          if (particle) {
            ctx.beginPath();
            ctx.arc(
              x * gridSize + gridSize / 2 + particle.dx,
              y * gridSize + gridSize / 2 + particle.dy,
              particleSize,
              0,
              Math.PI * 2
            );
            ctx.fill();
            ctx.closePath();
          }
        });
      });
    }

    function updateParticles() {
      drawParticles(); // Clear canvas and redraw particles

      grid.forEach(column => {
        column.forEach(particle => {
          if (particle) {
            // Generate a random force for movement at each frame
            particle.dx = Math.random() * 1 - 0.2;
            particle.dy = Math.random() * 0.3 - 0.2;
          }
        });
      });

      requestAnimationFrame(updateParticles);
    }

    // Initialize particles in grid cells with one particle per cell
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        const particle = {};
        grid[x][y] = particle;
      }
    }

    updateParticles();
  }, []);

  return (
    <div className="solid-canvas-container"> {/* Container for positioning */}
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
      ></canvas>
    </div>
  );
};


export default SolidParticles;
