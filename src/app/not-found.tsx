'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg"
      >
        <h1 className="text-accent text-9xl font-bold mb-3 font-space-grotesk">404</h1>
        
        <h2 className="text-3xl font-bold text-[#ccd6f6] mb-4">Page Not Found</h2>
        
        <p className="text-[#8892b0] mb-8">
          Oops! The page you're looking for seems to have wandered off into the digital void.
          Let's get you back to the known universe.
        </p>
        
        <Link
          href="/"
          className="bg-transparent hover:bg-accent/10 text-accent border border-accent px-7 py-4 rounded-md font-medium transition-colors duration-300 inline-block"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
