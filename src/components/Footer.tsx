'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiCodepen, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="py-8 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Mobile Social Links */}
        <motion.div 
          className="flex md:hidden justify-center mb-6 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
          <a            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-accent transition-colors"
            aria-label="Twitter"
          >
            <FiTwitter size={20} />
          </a>
          <a            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={20} />
          </a>
          <a            href="https://codepen.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-accent transition-colors"
            aria-label="CodePen"
          >
            <FiCodepen size={20} />
          </a>
          <a            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <FiInstagram size={20} />
          </a>
        </motion.div>
        
        <motion.div 
          className="text-center text-sm text-[#8892b0]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-4">
            <a 
              href="#"
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Designed & Built by Jeremiah Oladele
            </a>
          </div>
          
          <div className="group relative inline-block">
            <div className="flex items-center gap-1">
              <span className="group-hover:text-accent transition-colors">Made with creativity and code</span>
              <span className="group-hover:animate-pulse text-accent">♡</span>
            </div>
            
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[1px] bg-accent/50 w-0 group-hover:w-full transition-all duration-300"></div>
          </div>
          
        </motion.div>
      </div>
    </footer>
  );
}
