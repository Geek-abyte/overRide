"use client";

import React from 'react';

interface MinecraftImageProps {
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const MinecraftImage: React.FC<MinecraftImageProps> = ({ 
  alt, 
  className = '', 
  width = 300, 
  height = 200 
}) => {
  const colors = [
    'var(--grass)',
    'var(--dirt)',
    'var(--stone)',
    'var(--wood)',
    'var(--primary)',
    'var(--secondary)',
  ];

  const rows = 8;
  const cols = 12;
  const pixelSize = `${100 / cols}%`;

  const generatePixels = () => {
    const pixels = [];
    
    for (let i = 0; i < rows * cols; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const opacity = Math.random() * 0.7 + 0.3;
      
      pixels.push(
        <div
          key={i}
          className="absolute"
          style={{
            backgroundColor: colors[colorIndex],
            opacity,
            width: pixelSize,
            height: `${100 / rows}%`,
            left: `${(i % cols) * (100 / cols)}%`,
            top: `${Math.floor(i / cols) * (100 / rows)}%`,
          }}
        />
      );
    }
    
    return pixels;
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        width,
        height,
        backgroundColor: 'var(--background)',
        border: '4px solid var(--stone)',
        borderRadius: '4px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
      }}
    >
      {generatePixels()}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="z-10 text-white font-bold px-2 py-1 bg-black bg-opacity-30">
          {alt}
        </span>
      </div>
    </div>
  );
};

export default MinecraftImage;
