
import React from 'react';

interface TourOverlayProps {
  visible: boolean;
}

const TourOverlay = ({ visible }: TourOverlayProps) => {
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/40 z-50 pointer-events-none backdrop-blur-sm animate-fade-in">
      {/* This overlay darkens the background during the tour */}
    </div>
  );
};

export default TourOverlay;
