'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);
    
    const handleMouseOver = (e: MouseEvent) => {
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.onclick || 
        window.getComputedStyle(target).cursor === 'pointer';
        
      setIsHovering(isClickable);
    };
    
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
  
  // Hide cursor on mobile/tablet
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  if (isMobile) return null;
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 bg-accent rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.3 }}
      />
      
      {/* Trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 w-14 h-14 border-2 border-accent rounded-full pointer-events-none z-40 opacity-30 mix-blend-difference"
        animate={{
          x: mousePosition.x - 28,
          y: mousePosition.y - 28,
          scale: isClicking ? 1.2 : isHovering ? 1.5 : 1
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8, delay: 0.03 }}
      />
    </>
  );
}
