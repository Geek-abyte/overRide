'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition() {
  const pathname = usePathname();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    setIsRouteChanging(true);
    const timeout = setTimeout(() => {
      setIsRouteChanging(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isRouteChanging && (
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: '100%' }}
          exit={{ y: '0%' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-5xl font-bold text-accent mb-4 font-space-grotesk"
            >
              JO
            </motion.div>
            <div className="h-1 w-40 bg-[#112240] rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="h-full bg-accent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
