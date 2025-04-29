'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import * as THREE from 'three';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));    // Create single particle texture with a subtle elegant shape
    const particleTexture = createParticleTexture();
      // Setup for particles - further reduced count for perfect background ambiance
    const particlesCount = 1200;
      // Create particles with a single interesting shape
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);      // Fill position and size data for particles - create a more atmospheric distribution
    for (let i = 0; i < particlesCount; i++) {
      // Create a slightly "layered" effect by clustering particles in depth planes
      // This will create a more 3D illusion without distracting
      const depth = Math.random();
      const spread = 3 + depth * 4; // Particles further away (higher depth) have wider spread
      
      positions[i * 3] = (Math.random() - 0.5) * spread; 
      positions[i * 3 + 1] = (Math.random() - 0.5) * (spread * 0.6); // Less vertical spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2; // Move more particles deeper into background
        // More subtle size variation
      sizes[i] = Math.random() * 0.03 + 0.01;
    }
    
    // Create geometry for all particles
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));    // Create material with the subtle texture - soft, elegant appearance
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05, // Small, subtle size
      sizeAttenuation: true,
      map: particleTexture,
      alphaTest: 0.001,
      transparent: true,
      opacity: 0.5, // More transparency
      color: new THREE.Color('#a3f0dd').multiplyScalar(0.5), // Much gentler color
      blending: THREE.AdditiveBlending,
    });
    
    // Create particles
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    
    // Add all particles to the scene
    scene.add(particles);
    camera.position.z = 2;    // Function to create a subtle, elegant particle texture
    function createParticleTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64; // Smaller texture size
      canvas.height = 64;
      
      const context = canvas.getContext('2d');
      if (!context) return null;
      
      // Clear the canvas
      context.fillStyle = 'rgba(0,0,0,0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = canvas.width / 2;
      
      // Create a soft, feathered dot gradient
      const gradient = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        size
      );
      
      // Very subtle gradient for the particle
      gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.4)');
      gradient.addColorStop(0.6, 'rgba(255,255,255,0.1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      
      // Draw a simple, elegant soft circle
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(centerX, centerY, size * 0.7, 0, Math.PI * 2);
      context.fill();
        // Add a very subtle halo around the dot
      context.globalCompositeOperation = 'lighter';
      context.globalAlpha = 0.15;
      
      // Draw the subtle outer glow
      const haloGradient = context.createRadialGradient(
        centerX, centerY, size * 0.5,
        centerX, centerY, size
      );
      
      haloGradient.addColorStop(0, 'rgba(180, 255, 230, 0.05)');
      haloGradient.addColorStop(1, 'rgba(180, 255, 230, 0)');
      
      context.fillStyle = haloGradient;
      context.beginPath();
      context.arc(centerX, centerY, size, 0, Math.PI * 2);
      context.fill();
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0,
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
      // Animation - slower, more subtle movement
    const animate = () => {
      requestAnimationFrame(animate);
      
      particles.rotation.x += 0.0002; // Slower rotation
      particles.rotation.y += 0.0002;
        // Follow mouse with more subtle movement
      particles.rotation.x += mouse.y * 0.0002;
      particles.rotation.y += mouse.x * 0.0002;
      // Very subtle spin effect
      particles.rotation.z += 0.00005;
      
      renderer.render(scene, camera);
    };
    
    animate();
      // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      scene.remove(particles);
      
      // Clean up all resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      if (particleTexture) {
        particleTexture.dispose();
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen px-6 flex items-center justify-center">
      {/* 3D Background */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
      
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 text-accent font-mono"
          >
            Hi, my name is
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-[#ccd6f6] font-space-grotesk mb-4"
          >
            Jeremiah Oladele.
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-[#8892b0] font-space-grotesk mb-6"
          >
            I build exceptional digital experiences.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg text-[#8892b0] max-w-2xl mb-10"
          >
            I'm a software developer specializing in building (and occasionally designing) 
            exceptional digital experiences. Currently, I'm focused on building accessible, 
            human-centered products.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a 
              href="#projects" 
              className="bg-transparent hover:bg-accent/10 text-accent border border-accent px-7 py-4 rounded-md font-medium transition-colors duration-300"
            >
              Check out my work
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Social Links */}
      <motion.div 
        className="hidden md:flex fixed left-10 bottom-0 flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >        
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#8892b0] hover:text-accent mb-5 transition-colors">
          <FiGithub size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#8892b0] hover:text-accent mb-5 transition-colors">
          <FiTwitter size={20} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#8892b0] hover:text-accent mb-5 transition-colors">
          <FiLinkedin size={20} />
        </a>
        <a href="mailto:hello@jeremiah.dev" className="text-[#8892b0] hover:text-accent mb-5 transition-colors">
          <FiMail size={20} />
        </a>
        <div className="h-20 w-px bg-secondary"></div>
      </motion.div>
      
      {/* Email */}
      <motion.div 
        className="hidden md:flex fixed right-10 bottom-0 flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <a 
          href="mailto:hello@jeremiah.dev" 
          className="text-[#8892b0] hover:text-accent mb-5 transition-colors font-mono tracking-wider vertical-text"
          style={{ writingMode: 'vertical-rl' }}
        >
          hello@jeremiah.dev
        </a>
        <div className="h-20 w-px bg-secondary"></div>
      </motion.div>
    </section>
  );
}
