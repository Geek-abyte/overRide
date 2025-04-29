'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md px-6"
      >
        <div className="text-5xl font-bold text-accent mb-8 font-space-grotesk">JO</div>
        
        <div className="w-full bg-[#112240] h-1 mb-4 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          ></motion.div>
        </div>
        
        <p className="text-[#8892b0] font-mono">{`Loading... ${progress}%`}</p>
      </motion.div>
    </div>
  );
}
