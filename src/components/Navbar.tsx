'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md py-4 shadow-md'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="text-2xl font-space-grotesk font-bold text-[#64ffda]"
            aria-label="Jeremiah Oladele"
          >
            JO
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navItems.map((item, i) => (              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Link
                  href={item.href}
                  className="nav-link text-md font-medium"
                >
                  <span className="text-[#64ffda] mr-1">{`0${i + 1}.`}</span> {item.name}
                </Link>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >              <Link
                href="/resume"
                className="border border-accent text-accent px-4 py-2 rounded-md hover:bg-accent/10 transition-colors"
              >
                Resume
              </Link>
            </motion.li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-accent"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden fixed inset-0 bg-[#112240]/95 z-40 flex items-center justify-center ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        initial={{ opacity: 0, x: '100%' }}
        animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
        transition={{ duration: 0.3 }}
      >
        <nav className="w-full h-full flex items-center justify-center">
          <ul className="flex flex-col items-center space-y-8">
            {navItems.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                <Link
                  href={item.href}
                  className="text-xl font-medium text-[#ccd6f6] hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-accent mr-1">{`0${i + 1}.`}</span> {item.name}
                </Link>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >              <Link
                href="/resume"
                className="border border-accent text-accent px-6 py-3 rounded-md hover:bg-accent/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Resume
              </Link>
            </motion.li>
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}
