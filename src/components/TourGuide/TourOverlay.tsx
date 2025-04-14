
import React from 'react';

interface TourOverlayProps {
  visible: boolean;
}

const TourOverlay = ({ visible }: TourOverlayProps) => {
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 z-40 pointer-events-none animate-fade-in transition-all duration-300">
      {/* Semi-transparent overlay that doesn't blur content */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-blue-900/50 pointer-events-none"></div>
      
      {/* Subtle particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400/30 animate-float pointer-events-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Light path effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxOTc2RDIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0xN3Y5aDR2LTloLTR6TTI0IDQyLjVoMS41djFIMjR2LTF6TTIwIDI4aDV2LTFoLTV2MXptLTggMTBoMS41di0xLjVIMTJ2MS41ek0zNiAxOS41aDEuNXYtMS41SDM2djEuNXptLTE0LTUuNXYxaDE0di0xSDIyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default TourOverlay;
