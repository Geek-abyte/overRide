import { useEffect, useState } from 'react';

interface Block {
  id: number;
  type: string;
  size: number;
  x: number;
  y: number;
  rotate: number;
  opacity: number;
}

const BackgroundDecoration = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  
  useEffect(() => {
    // Generate random blocks for decoration
    const blockTypes = ['grass', 'dirt', 'stone', 'wood'];
    const newBlocks = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      type: blockTypes[Math.floor(Math.random() * blockTypes.length)],
      size: Math.random() * 30 + 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotate: Math.random() * 360,
      opacity: Math.random() * 0.15 + 0.05
    }));
    
    setBlocks(newBlocks);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`absolute rounded-sm transform`}
          style={{
            width: `${block.size}px`,
            height: `${block.size}px`,
            left: `${block.x}%`,
            top: `${block.y}%`,
            backgroundColor: 
              block.type === 'grass' ? 'var(--grass)' :
              block.type === 'dirt' ? 'var(--dirt)' :
              block.type === 'stone' ? 'var(--stone)' : 'var(--wood)',
            opacity: block.opacity,
            transform: `rotate(${block.rotate}deg)`,
            transition: 'transform 5s ease-in-out, opacity 2s ease-in-out',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
          }}        />
      ))}
    </div>
  );
};

export default BackgroundDecoration;
