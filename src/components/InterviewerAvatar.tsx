
import { useState, useEffect } from 'react';

interface InterviewerAvatarProps {
  speaking?: boolean;
  size?: number;
}

const InterviewerAvatar = ({ speaking = false, size = 300 }: InterviewerAvatarProps) => {
  const [mouthOpen, setMouthOpen] = useState(0);
  
  // Add mouth animation when speaking
  useEffect(() => {
    if (speaking) {
      // Simple mouth movement pattern
      const interval = setInterval(() => {
        setMouthOpen(Math.random() * 0.6 + 0.2); // Random mouth position when speaking
      }, 150);
      
      return () => clearInterval(interval);
    } else {
      setMouthOpen(0);
    }
  }, [speaking]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '0 auto',
        backgroundColor: '#f5f5f5',
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}
    >
      {/* Base face image - a simple neutral face */}
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F1F0FB',
        }}
      >
        {/* Head shape */}
        <div style={{ 
          width: '90%', 
          height: '90%', 
          borderRadius: '50%', 
          backgroundColor: '#aaadb0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Hair */}
          <div style={{ 
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '35%',
            backgroundColor: '#1A1F2C',
          }} />
          
          {/* Face */}
          <div style={{ 
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '80%',
            height: '75%',
            borderRadius: '50%',
            backgroundColor: '#eee',
          }}>
            {/* Eyes */}
            <div style={{ 
              position: 'absolute',
              top: '30%',
              left: '25%',
              width: '15%',
              height: '8%',
              borderRadius: '50%',
              backgroundColor: '#000000e6',
            }} />
            <div style={{ 
              position: 'absolute',
              top: '30%',
              right: '25%',
              width: '15%',
              height: '8%',
              borderRadius: '50%',
              backgroundColor: '#000000e6',
            }} />
            
            {/* Eyebrows */}
            <div style={{ 
              position: 'absolute',
              top: '22%',
              left: '20%',
              width: '20%',
              height: '3%',
              backgroundColor: '#1A1F2C',
              borderRadius: '4px',
              transform: speaking ? 'translateY(-2px)' : 'none',
              transition: 'transform 0.2s',
            }} />
            <div style={{ 
              position: 'absolute',
              top: '22%',
              right: '20%',
              width: '20%',
              height: '3%',
              backgroundColor: '#1A1F2C',
              borderRadius: '4px',
              transform: speaking ? 'translateY(-2px)' : 'none',
              transition: 'transform 0.2s',
            }} />
            
            {/* Nose */}
            <div style={{ 
              position: 'absolute',
              top: '40%',
              left: '47%',
              width: '6%',
              height: '15%',
              backgroundColor: '#ddd',
              borderRadius: '50%',
            }} />
            
            {/* Mouth - animated when speaking */}
            <div style={{ 
              position: 'absolute',
              bottom: '20%',
              left: '30%',
              width: '40%',
              height: speaking ? `${mouthOpen * 15}%` : '2%',
              backgroundColor: speaking ? '#8E9196' : '#999',
              borderRadius: speaking ? '50% / 100%' : '15px',
              transition: 'height 0.1s',
              overflow: 'hidden',
              border: '1px solid #666',
            }}>
              {/* Mouth interior - only visible when speaking */}
              {speaking && mouthOpen > 0.3 && (
                <div style={{ 
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: '50%',
                  backgroundColor: '#ea384c',
                }} />
              )}
            </div>
          </div>
          
          {/* Collar/Shirt */}
          <div style={{ 
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '15%',
            backgroundColor: '#fff',
          }} />
        </div>
      </div>
      
      {speaking && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium animate-pulse">
            Speaking...
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewerAvatar;
