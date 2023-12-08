import React, { useEffect } from 'react';
import './StatesOfMatter.css';

const StatesOfMatter = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const moleculeCount = 40;
    const moleculeInfo = {
      radius: 5,
      speed: 1,
    };

    const molecules = [];
    for (let i = 0; i < moleculeCount; i++) {
      const x = Math.random() * (canvas.width - moleculeInfo.radius * 2) + moleculeInfo.radius;
      const y = Math.random() * (canvas.height - moleculeInfo.radius * 2) + moleculeInfo.radius;
      const dx = Math.random() > 0.5 ? moleculeInfo.speed : -moleculeInfo.speed;
      const dy = Math.random() > 0.5 ? moleculeInfo.speed : -moleculeInfo.speed;
      molecules.push({ x, y, dx, dy, ...moleculeInfo });
    }

    function drawMolecules() {
      molecules.forEach(molecule => {
        ctx.beginPath();
        ctx.arc(molecule.x, molecule.y, molecule.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
      });
    }

    function moveMolecules() {
      molecules.forEach(molecule => {
        molecule.x += molecule.dx;
        molecule.y += molecule.dy;

        // Wall collision detection
        if (molecule.x + molecule.radius > canvas.width || molecule.x - molecule.radius < 0) {
          molecule.dx *= -1;
        }
        if (molecule.y + molecule.radius > canvas.height || molecule.y - molecule.radius < 0) {
          molecule.dy *= -1;
        }

        // Particle collision detection
        molecules.forEach(otherMolecule => {
          if (molecule !== otherMolecule) {
            const distance = Math.sqrt(
              (molecule.x - otherMolecule.x) ** 2 + (molecule.y - otherMolecule.y) ** 2
            );
            if (distance < molecule.radius * 2) {
              const dx = otherMolecule.x - molecule.x;
              const dy = otherMolecule.y - molecule.y;
              const collisionAngle = Math.atan2(dy, dx);
              const speed1 = Math.sqrt(molecule.dx ** 2 + molecule.dy ** 2);
              const speed2 = Math.sqrt(otherMolecule.dx ** 2 + otherMolecule.dy ** 2);

              const direction1 = Math.atan2(molecule.dy, molecule.dx);
              const direction2 = Math.atan2(otherMolecule.dy, otherMolecule.dx);

              molecule.dx = speed2 * Math.cos(direction2 - collisionAngle) * Math.cos(collisionAngle) + speed1 * Math.sin(direction1 - collisionAngle) * Math.cos(collisionAngle + Math.PI / 2);
              molecule.dy = speed2 * Math.cos(direction2 - collisionAngle) * Math.sin(collisionAngle) + speed1 * Math.sin(direction1 - collisionAngle) * Math.sin(collisionAngle + Math.PI / 2);
              otherMolecule.dx = speed1 * Math.cos(direction1 - collisionAngle) * Math.cos(collisionAngle) + speed2 * Math.sin(direction2 - collisionAngle) * Math.cos(collisionAngle + Math.PI / 2);
              otherMolecule.dy = speed1 * Math.cos(direction1 - collisionAngle) * Math.sin(collisionAngle) + speed2 * Math.sin(direction2 - collisionAngle) * Math.sin(collisionAngle + Math.PI / 2);
            }
          }
        });
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMolecules();
      requestAnimationFrame(moveMolecules);
    }

    moveMolecules();
  }, []);

  return (
    <div className="simulation">
      <h1>States of Matter</h1>
      <div id="SOM-container">
        <canvas id="canvas" width="400" height="400"></canvas>
        <button id="start-btn" className="btn">Start</button>
      </div>
    </div>
  );
};

export default StatesOfMatter;
