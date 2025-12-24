import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = ({ variant = 'default' }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggleTheme}
        className="relative p-2 rounded-full transition-all duration-300 hover:bg-primary/10"
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 0 : 180, scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {theme === 'dark' ? (
            <Moon className="w-5 h-5 text-primary" />
          ) : (
            <Sun className="w-5 h-5 text-warning" />
          )}
        </motion.div>
      </button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative group flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 hover:border-primary/50 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Toggle theme"
    >
      <div className="relative w-12 h-6 rounded-full bg-muted/50 p-1">
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"
          animate={{ x: theme === 'dark' ? 0 : 24 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
        <div className="absolute inset-0 flex items-center justify-between px-1.5">
          <Moon className="w-3 h-3 text-primary/60" />
          <Sun className="w-3 h-3 text-warning/60" />
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
      <Sparkles className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
};

export default ThemeToggle;
