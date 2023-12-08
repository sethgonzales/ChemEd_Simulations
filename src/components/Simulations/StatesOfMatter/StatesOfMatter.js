import React, { useEffect } from 'react';
import './StatesOfMatter.css';

const StatesOfMatter = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const moleculeRowCount = 10;
    const moleculeColumnCount = 10;
    const moleculeInfo = {
      padding: 2,
      w: 10,
      h: 10,
      offsetX: 10,
      offsetY: 10,
      speed: 3,
      dx: 4,
      dy: -4,
    };

    const molecules = [];
    for (let i = 0; i < moleculeRowCount; i++) {
      molecules[i] = [];
      for (let j = 0; j < moleculeColumnCount; j++) {
        const x = i * (moleculeInfo.w + moleculeInfo.padding) + moleculeInfo.offsetX;
        const y = j * (moleculeInfo.h + moleculeInfo.padding) + moleculeInfo.offsetY;
        molecules[i][j] = { x, y, ...moleculeInfo };
      }
    }

    function drawMolecules() {
      molecules.forEach(column => {
        column.forEach(molecule => {
          ctx.beginPath();
          ctx.rect(molecule.x, molecule.y, molecule.w, molecule.h);
          ctx.fillStyle = '#0095dd';
          ctx.fill();
          ctx.closePath();
        });
      });
    }

    function moveMolecules() {
      molecules.forEach(column => {
        column.forEach(molecule => {
          molecule.x += molecule.dx;
          molecule.y += molecule.dy;

          if (molecule.x + molecule.w > canvas.width || molecule.x < 0) {
            molecule.dx *= -1;
          }
          if (molecule.y + molecule.h > canvas.height || molecule.y < 0) {
            molecule.dy *= -1;
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
        <canvas id="canvas" width="800" height="600"></canvas>
        <button id="start-btn" className="btn">Start</button>
      </div>
    </div>
  );
};

export default StatesOfMatter;
