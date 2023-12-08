import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StatesAnimations = () => {
  const containerRef = useRef(null); // Reference to the container div
  const rendererRef = useRef(null); // Reference to the renderer

  useEffect(() => {
    // Initialize Three.js components
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true
    renderer.setClearColor(0x000000, 0); // 0 alpha for the background
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append renderer's DOM element to the container
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Save reference for cleanup


    // Set up animation loop particles
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Return a clean-up function to dispose Three.js resources on unmount
    return () => {
      if (rendererRef.current) {
        rendererRef.current.domElement.remove();
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div id="states-animation-container" ref={containerRef}></div>;
};

export default StatesAnimations;
