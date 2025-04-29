'use client';

import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  // We'll default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize the theme based on user's preference
  useEffect(() => {
    // Check if user previously set a theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
      document.documentElement.classList.toggle('light-mode', storedTheme === 'light');
    } else {
      // Check user's OS preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('light-mode', !prefersDark);
    }
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light-mode', newTheme === 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#112240] border border-[#233554] hover:border-accent transition-colors"
      whileTap={{ scale: 0.9 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {isDarkMode ? (
        <FiSun size={20} className="text-accent" />
      ) : (
        <FiMoon size={20} className="text-accent" />
      )}
    </motion.button>
  );
}
