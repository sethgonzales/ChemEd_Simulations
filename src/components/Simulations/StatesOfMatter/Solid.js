import React, { useEffect, useRef } from 'react';

const Solid = ({ molecules }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawMolecules = () => {
      molecules.forEach(molecule => {
        ctx.beginPath();
        ctx.arc(molecule.x, molecule.y, molecule.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0000'; // Example color for solid state
        ctx.fill();
        ctx.closePath();
      });
    };

    const moveMolecules = () => {
      // Logic for molecule movement in the solid state
      molecules.forEach(molecule => {
        // Example movement in the solid state (may differ based on behavior)
        molecule.dx = 0.5; // Some movement in x direction
        molecule.dy = 0.5; // Some movement in y direction

        molecule.x += molecule.dx;
        molecule.y += molecule.dy;

        // Wall collision detection logic for the solid state (if needed)
        // Adjust coordinates or direction upon collision
        // Example:
        if (molecule.x + molecule.radius > canvas.width || molecule.x - molecule.radius < 0) {
          molecule.dx = -molecule.dx;
        }
        if (molecule.y + molecule.radius > canvas.height || molecule.y - molecule.radius < 0) {
          molecule.dy = -molecule.dy;
        }
      });

      // Clear canvas and redraw molecules
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMolecules();

      // Request next animation frame for continuous movement
      requestAnimationFrame(moveMolecules);
    };

    // Initial drawing of molecules
    drawMolecules();

    // Start the animation loop
    moveMolecules();

  }, [molecules]);

  return (
    <div>
      <h2>Solid State</h2>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default Solid;
