"use client";

import { useCallback, useEffect, useState, useRef } from 'react';

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;
  id: number;
}

const MinecraftCursor = () => {  // Use refs instead of state for positions to avoid re-renders
  const positionRef = useRef({ x: -100, y: -100 });
  const isPointerRef = useRef(false);
  const heartRef = useRef<HTMLDivElement>(null);
  const pickaxeRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [particleId, setParticleId] = useState(0);
  const rafRef = useRef<number | null>(null);
  const throttleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Update cursor elements directly without causing re-renders
  const updateCursorElements = useCallback(() => {
    if (!heartRef.current || !pickaxeRef.current) return;
    
    const { x, y } = positionRef.current;
      // Update heart position without changing opacity (handled in updatePosition)
    Object.assign(heartRef.current.style, {
      left: `${x - 14}px`,
      top: `${y - 14}px`,
    });
    
    // Update pickaxe position without changing opacity (handled in updatePosition)
    Object.assign(pickaxeRef.current.style, {
      left: `${x - 14}px`, // Match heart's offset for consistent positioning
      top: `${y - 14}px`,  // Match heart's offset for consistent positioning
    });
    
    rafRef.current = requestAnimationFrame(updateCursorElements);
  }, []);
  // Optimize: Only check for cursor type when needed using throttling
  const updatePosition = useCallback((e: MouseEvent) => {
    // Update position directly without setState
    positionRef.current = { x: e.clientX, y: e.clientY };
    
    // Check for pointer cursor but only every few moves (throttled)
    // Use a more efficient check that doesn't rely on expensive DOM operations
    const target = e.target as HTMLElement;
    if (target) {
      const computedStyle = window.getComputedStyle(target);
      const cursor = computedStyle.getPropertyValue('cursor');
      const tagName = target.tagName.toLowerCase();
      
      // Store the previous state before updating
      const wasPointer = isPointerRef.current;
      
      // Enhanced detection with a more reliable check
      const isInteractive = (
        tagName === 'a' || 
        tagName === 'button' || 
        target.hasAttribute('onclick') || 
        cursor === 'pointer' || 
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        !!target.closest('a, button, [role="button"], [onclick], .cursor-pointer')
      );
      
      // Only update state if it changed
      if (isInteractive !== wasPointer) {
        isPointerRef.current = isInteractive;
        
        // Ensure we have refs before applying changes
        if (heartRef.current && pickaxeRef.current) {
          heartRef.current.style.opacity = isInteractive ? '0' : '1';
          pickaxeRef.current.style.opacity = isInteractive ? '1' : '0';
          
          // Reset transform when changing cursor type to avoid stuck transforms
          if (isInteractive) {
            pickaxeRef.current.style.transform = 'rotate(0deg) scale(1)';
          }
        }
      }
    }
  }, []);

  // Optimize the click particle creation
  const createParticles = useCallback((x: number, y: number) => {
    // Minecraft block colors - dirt, stone, grass, wood
    const colors = [
      '#9B7653', '#7A7A7A', '#5D9C41', '#A0693E', // Minecraft theme colors
      '#8B4513', '#A0522D' // Reduce colors to improve performance
    ];
    
    // Create fewer particles to improve performance
    const particleCount = Math.floor(Math.random() * 5) + 5; // 5-10 particles
    
    const newParticles: ParticleProps[] = [];
    for (let i = 0; i < particleCount; i++) {
      // Make particles more blocky and Minecraft-like
      const size = Math.random() * 5 + 3;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      const velocityX = Math.cos(angle) * speed;
      const velocityY = Math.sin(angle) * speed;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newParticles.push({
        x,
        y, 
        size,
        color,
        velocityX,
        velocityY,
        id: particleId + i
      });
    }
    
    setParticleId(prev => prev + particleCount);
    setParticles(prev => [...prev, ...newParticles]);
      // Add swing effect to pickaxe without using state updates
    if (pickaxeRef.current) {
      // Apply transformations directly to current style
      pickaxeRef.current.style.transform = 'rotate(-45deg) scale(1.2)';
      
      // Clear any existing animations to prevent conflicts
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      
      // Reset the transformation after animation completes
      clickTimeoutRef.current = setTimeout(() => {
        if (pickaxeRef.current) {
          pickaxeRef.current.style.transform = 'rotate(0deg) scale(1)';
        }
      }, 200); // Slightly longer animation for better visibility
    }
      // Audio - only create it if we're going to use it (performance optimization)
    try {
      // Use proper type for WebKit AudioContext
      interface AudioContextType {
        new (): AudioContext;
      }
      
      const AudioContext = window.AudioContext || 
        ((window as { webkitAudioContext?: AudioContextType }).webkitAudioContext);
        
      if (AudioContext) {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(150 + Math.random() * 100, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Reduced volume
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
          oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
      }
    } catch {
      // Skip audio if not supported
    }
  }, [particleId]);

  // Handle click event - simplified
  const handleClick = useCallback((e: MouseEvent) => {
    createParticles(e.clientX, e.clientY);
  }, [createParticles]);

  // Update particles with optimized animation
  useEffect(() => {
    if (particles.length === 0) return;
    
    const gravity = 0.35;
    const friction = 0.96;
    
    // Use a single interval for all particles instead of recreating it
    const timer = setTimeout(() => {
      setParticles(prevParticles => {
        // Process all particles in a single pass for better performance
        return prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velocityX,
            y: particle.y + particle.velocityY,
            velocityX: particle.velocityX * friction,
            velocityY: particle.velocityY * friction + gravity,
            // Optimize filtering criteria - fewer calculations
            size: particle.velocityY > 5 ? particle.size * 0.9 : particle.size
          }))
          .filter(particle => particle.size > 2 && particle.y < window.innerHeight); // Raise size threshold
      });
    }, 20); // Reduced from 16ms to 20ms (50fps instead of 60fps)
    
    return () => clearTimeout(timer);
  }, [particles]);
  // Setup event listeners with optimizations
  useEffect(() => {
    // Apply initial cursor styles on first render
    if (heartRef.current && pickaxeRef.current) {
      heartRef.current.style.opacity = '1';
      pickaxeRef.current.style.opacity = '0';
    }
    
    // Custom pointer detection handler to reduce flickering
    const handlePointerDetection = (e: MouseEvent) => {
      // Don't process too frequently
      if (throttleTimerRef.current) return;
      
      throttleTimerRef.current = setTimeout(() => {
        throttleTimerRef.current = null;
        
        const target = e.target as HTMLElement;
        if (!target) return;
        
        const computedStyle = window.getComputedStyle(target);
        const cursor = computedStyle.getPropertyValue('cursor');
        const tagName = target.tagName.toLowerCase();
        
        // More aggressive pointer detection
        const shouldBePointer = (
          tagName === 'a' || 
          tagName === 'button' || 
          target.hasAttribute('onclick') || 
          cursor === 'pointer' || 
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer') ||
          target.closest('a, button, [role="button"], [onclick]') !== null
        );
        
        // Only update if state changed to prevent flickering
        if (shouldBePointer !== isPointerRef.current) {
          isPointerRef.current = shouldBePointer;
          
          if (heartRef.current && pickaxeRef.current) {
            heartRef.current.style.opacity = shouldBePointer ? '0' : '1';
            pickaxeRef.current.style.opacity = shouldBePointer ? '1' : '0';
          }
        }
      }, 30); // Short throttle time
    };
    
    // Start the animation loop
    rafRef.current = requestAnimationFrame(updateCursorElements);
    
    // Use passive: true for better scroll performance
    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseover', handlePointerDetection, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    
    // Hide cursor globally
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';
      // Use a more efficient CSS selector strategy
    const style = document.createElement('style');
    style.textContent = `
      * { cursor: none !important; }
      a, button, [role="button"], select, input, [onclick] { 
        cursor: none !important; 
      }
      .pixelated {
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
      return () => {
      // Clean up all resources
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current);
        throttleTimerRef.current = null;
      }
      
      // Remove all event listeners
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handlePointerDetection);
      document.removeEventListener('click', handleClick);
      
      // Reset cursor styles
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
      
      // Clean up style element
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [updatePosition, handleClick, updateCursorElements]);

  return (
    <>
      {/* Base cursor (heart) - using ref for DOM manipulation */}
      <div 
        ref={heartRef}
        className="fixed pointer-events-none z-50 w-7 h-7 select-none"
        style={{
          left: '-100px',
          top: '-100px',
          backgroundImage: `url('/images/heart.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transition: 'opacity 0.08s linear',
          animation: 'float 3s ease-in-out infinite',
          imageRendering: 'pixelated',
          willChange: 'transform, left, top'
        }}
      />      {/* Pointer cursor (pickaxe) - using ref for DOM manipulation */}
      <div 
        ref={pickaxeRef}
        className="fixed pointer-events-none z-50 w-7 h-7 select-none"
        style={{
          left: '-100px',
          top: '-100px',
          backgroundImage: `url('/images/pickaxe.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transition: 'opacity 0.08s linear, transform 0.15s ease-out',
          imageRendering: 'pixelated',
          transform: 'rotate(0deg)', // Reset default rotation
          transformOrigin: 'center', // Center the rotation point
          willChange: 'transform, left, top',
          opacity: 0
        }}
      />
      
      {/* Particles - only state-driven component we need */}
      {particles.length > 0 && particles.map((particle) => (
        <div 
          key={particle.id}
          className="fixed pointer-events-none z-40 pixelated"
          style={{
            left: 0,
            top: 0,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `inset -1px -1px 0 rgba(0,0,0,0.3)`,
            transform: `translate(${particle.x}px, ${particle.y}px) rotate(${(particle.id % 4) * 90}deg)`,
            imageRendering: 'pixelated',
          }}
        />
      ))}
    </>
  );
};

export default MinecraftCursor;
