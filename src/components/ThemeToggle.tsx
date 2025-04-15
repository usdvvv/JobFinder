
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/components/ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme toggle only renders client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Toggle 
      pressed={isDark}
      onPressedChange={handleToggle}
      aria-label="Toggle theme"
      className="relative w-10 h-10 rounded-full bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    >
      <div className="relative w-6 h-6 mx-auto">
        {/* Sun icon that morphs to moon */}
        <motion.div
          className="absolute inset-0 text-yellow-500 dark:text-transparent"
          animate={{ 
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1]
          }}
        >
          <Sun className="w-6 h-6" />
        </motion.div>
        
        {/* Moon icon that morphs from sun */}
        <motion.div
          className="absolute inset-0 text-transparent dark:text-blue-400"
          animate={{ 
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1]
          }}
        >
          <Moon className="w-6 h-6" />
        </motion.div>
      </div>
    </Toggle>
  );
};

export default ThemeToggle;
