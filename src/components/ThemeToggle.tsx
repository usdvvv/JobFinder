
import React, { useEffect, useState } from 'react';
import { useTheme } from "@/components/ThemeProvider";
import ThemeSwitch from "@/components/ui/theme-switch";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme toggle only renders client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center">
      <ThemeSwitch />
    </div>
  );
};

export default ThemeToggle;
