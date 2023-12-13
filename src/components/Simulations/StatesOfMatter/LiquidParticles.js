import React, { useEffect, useRef } from 'react';

const LiquidParticles = () => {
  const canvasRef = useRef(null);
  const particleCount = 100;
  const particleSize = 15;
  const particleGap = 6;
  const movementFactor = 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    //create columns and rows of molecules at the bottom of the canvas
    const columns = 25;
    const rows = 4;
    const particles = [];

    // Calculate the center position of the canvas
    const centerX = canvasWidth / 2;
    const bottomY = canvasHeight - (particleSize + particleGap) / 2;

    // Create particles in a lattice at the bottom center of the canvas
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
      const liquidMovementSpeed = 1;
      const gravity = 0.028;

      particles.forEach(particle => {
        particle.dy = Math.random() * liquidMovementSpeed * 2 - liquidMovementSpeed;
        particle.dx = Math.random() * liquidMovementSpeed * 2 - liquidMovementSpeed;
    
        // Apply gravitational pull towards the bottom
        particle.dy += gravity;
    
        // Wall collision detection
        if (particle.x + particle.radius > canvasWidth || particle.x - particle.radius < 0) {
          particle.dx = -particle.dx;
          // Adjust particle position to prevent going beyond the walls
          if (particle.x + particle.radius > canvasWidth) {
            particle.x = canvasWidth - particle.radius;
          } else if (particle.x - particle.radius < 0) {
            particle.x = particle.radius;
          }
        }
        if (particle.y + particle.radius > canvasHeight || particle.y - particle.radius < 0) {
          particle.dy = -particle.dy;
          // Adjust particle position to prevent going beyond the walls
          if (particle.y + particle.radius > canvasHeight) {
            particle.y = canvasHeight - particle.radius;
          } else if (particle.y - particle.radius < 0) {
            particle.y = particle.radius;
          }
        }

        // Particle collision detection
        particles.forEach(otherParticle => {
          if (particle !== otherParticle) {
            const distance = Math.sqrt(
              (particle.x - otherParticle.x) ** 2 + (particle.y - otherParticle.y) ** 2
            );
            if (distance < particle.radius * 2) {

              const dx = otherParticle.x - particle.x;
              const dy = otherParticle.y - particle.y;
              const collisionAngle = Math.atan2(dy, dx);
              const speed1 = Math.sqrt(particle.dx ** 2 + particle.dy ** 2);
              const speed2 = Math.sqrt(otherParticle.dx ** 2 + otherParticle.dy ** 2);

              const direction1 = Math.atan2(particle.dy, particle.dx);
              const direction2 = Math.atan2(otherParticle.dy, otherParticle.dx);

              particle.dx = speed2 * Math.cos(direction2 - collisionAngle) * Math.cos(collisionAngle) + speed1 * Math.sin(direction1 - collisionAngle) * Math.cos(collisionAngle + Math.PI / 2);
              particle.dy = speed2 * Math.cos(direction2 - collisionAngle) * Math.sin(collisionAngle) + speed1 * Math.sin(direction1 - collisionAngle) * Math.sin(collisionAngle + Math.PI / 2);
              otherParticle.dx = speed1 * Math.cos(direction1 - collisionAngle) * Math.cos(collisionAngle) + speed2 * Math.sin(direction2 - collisionAngle) * Math.cos(collisionAngle + Math.PI / 2);
              otherParticle.dy = speed1 * Math.cos(direction1 - collisionAngle) * Math.sin(collisionAngle) + speed2 * Math.sin(direction2 - collisionAngle) * Math.sin(collisionAngle + Math.PI / 2);
            }
          }
        });

        // Update particle positions
        particle.x += particle.dx;
        particle.y += particle.dy;
      });

      drawParticles();
      requestAnimationFrame(updateParticles);
    }

    updateParticles();
  }, []);

  return (
    <canvas ref={canvasRef} width={400} height={400}></canvas>
  );
};

export default LiquidParticles;
