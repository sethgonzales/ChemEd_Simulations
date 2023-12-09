import React, { useEffect, useRef } from 'react';

const SolidParticles = () => {
  const canvasRef = useRef(null);
  const particleCount = 10;
  const particleSize = 10;
  const particleGap = 2;
  const movementFactor = 0.1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const columns = Math.sqrt(particleCount);
    const rows = Math.sqrt(particleCount);
    const particles = [];

    // Calculate the center position of the canvas
    const centerX = canvasWidth / 2;
    const bottomY = canvasHeight - (particleSize + particleGap) / 2;

    // Create particles in a square lattice at the bottom center of the canvas
    let count = 0;
    for (let row = rows - 1; row >= 0 && count < particleCount; row--) {
      for (let col = 0; col < columns && count < particleCount; col++) {
        const x = centerX + (col - columns / 2) * (particleSize + particleGap);
        const y = bottomY - row * (particleSize + particleGap);
        const dx = (Math.random() - 0.5) * movementFactor;
        const dy = (Math.random() - 0.5) * movementFactor;
        particles.push({ x, y, dx, dy, radius: particleSize / 2 });
        count++;
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });
    }

    function updateParticles() {
      const attractionStrength = 0.1; // Adjust attraction strength
      const repulsionStrength = 3; // Adjust repulsion strength
      const minGap = particleSize * 10; // Minimum gap between particles

      // Reset particle velocities
      particles.forEach(particle => {
        particle.dx = 0;
        particle.dy = 0;
      });

      particles.forEach(particle => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Wall collision detection considering particle radius
        if (particle.x + particle.radius > canvasWidth || particle.x - particle.radius < 0) {
          particle.dx = -particle.dx;
        }
        if (particle.y + particle.radius > canvasHeight || particle.y - particle.radius < 0) {
          particle.dy = -particle.dy;
        }

        // Apply interactions between particles
        particles.forEach(otherParticle => {
          if (particle !== otherParticle) {
            const dx = otherParticle.x - particle.x;
            const dy = otherParticle.y - particle.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);

            // Apply attraction forces based on distance
            if (distance < particle.radius * 100) {
              const force = (attractionStrength * particle.radius ** 2) / distance;
              const forceX = force * dx;
              const forceY = force * dy;

              particle.dx += forceX;
              particle.dy += forceY;
              otherParticle.dx -= forceX;
              otherParticle.dy -= forceY;

              // Particle collision resolution
              const minDistance = particle.radius + otherParticle.radius + minGap;
              if (distance < minDistance) {
                const overlap = minDistance - distance;
                const angle = Math.atan2(dy, dx);
                const moveX = overlap * Math.cos(angle);
                const moveY = overlap * Math.sin(angle);

                particle.x += moveX * 0.5;
                particle.y += moveY * 0.5;
                otherParticle.x -= moveX * 0.5;
                otherParticle.y -= moveY * 0.5;
              }
            }

            // Repulsion force to prevent overlap
            if (distance < particle.radius * 20) {
              const force = repulsionStrength / distance ** 2;
              const forceX = force * dx;
              const forceY = force * dy;

              particle.dx += forceX;
              particle.dy += forceY;
              otherParticle.dx -= forceX;
              otherParticle.dy -= forceY;
            }
          }
        });
      });

      drawParticles();
      requestAnimationFrame(updateParticles);
    }

    // Start updating particles
    updateParticles();
  }, []); // Empty dependency array to run the effect only once

  return (
    <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid #000' }}></canvas>
  );
};

export default SolidParticles;
