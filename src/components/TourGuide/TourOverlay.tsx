
import React from 'react';

interface TourOverlayProps {
  visible: boolean;
}

const TourOverlay = ({ visible }: TourOverlayProps) => {
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 z-40 pointer-events-none animate-fade-in transition-all duration-300">
      {/* Semi-transparent overlay with theme-appropriate colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/20 dark:from-blue-950/40 dark:to-blue-900/30 pointer-events-none"></div>
      
      {/* Subtle particle effects with theme colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30 dark:bg-blue-400/20 animate-float pointer-events-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Theme-appropriate background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10 dark:opacity-15 pointer-events-none"></div>
    </div>
  );
};

export default TourOverlay;
