
import { useState, useEffect } from 'react';
import { Video, Mic, MicOff, Clock } from 'lucide-react';

interface Interviewer3DAvatarProps {
  speaking?: boolean;
  size?: number;
}

const Interviewer3DAvatar = ({ speaking = false, size = 300 }: Interviewer3DAvatarProps) => {
  const [currentTime, setCurrentTime] = useState('');
  const [interviewerState, setInterviewerState] = useState<'listening' | 'speaking' | 'thinking'>('listening');
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  
  // Interviewer expressions that cycle when speaking
  const expressions = [
    '/interviewer-neutral.png',
    '/interviewer-speaking-1.png',
    '/interviewer-speaking-2.png',
    '/interviewer-thinking.png'
  ];
  
  // Office backgrounds that subtly change
  const backgrounds = [
    'linear-gradient(to right, #e6e9f0 0%, #eef1f5 100%)',
    'linear-gradient(to right, #d7d2cc 0%, #304352 100%)',
    'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)'
  ];
  
  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update interviewer state based on speaking prop
  useEffect(() => {
    if (speaking) {
      setInterviewerState('speaking');
    } else {
      // Random choice between listening and thinking when not speaking
      setInterviewerState(Math.random() > 0.7 ? 'thinking' : 'listening');
    }
  }, [speaking]);
  
  // Occasionally change the office background
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(prev => (prev + 1) % backgrounds.length);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Get expression image based on state
  const getExpressionImage = () => {
    switch (interviewerState) {
      case 'speaking':
        // Cycle through speaking expressions
        return expressions[Math.floor(Date.now() / 500) % 2 + 1];
      case 'thinking':
        return expressions[3];
      case 'listening':
      default:
        return expressions[0];
    }
  };
  
  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      {/* Video conference frame */}
      <div 
        className="rounded-lg overflow-hidden shadow-lg border border-gray-200" 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          background: backgrounds[backgroundIndex],
          transition: 'background 2s ease-in-out'
        }}
      >
        {/* Top bar with controls */}
        <div className="absolute top-0 left-0 right-0 bg-black/70 text-white px-3 py-2 flex justify-between items-center z-10">
          <div className="flex items-center space-x-2">
            <Video size={14} />
            <span className="text-xs font-medium">Interview in progress</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock size={14} />
            <span className="text-xs">{currentTime}</span>
          </div>
        </div>
        
        {/* Interviewer container */}
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Placeholder for interviewer image */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={getExpressionImage()}
                alt="AI Interviewer"
                className="max-w-full max-h-full object-contain rounded-md"
                style={{ 
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                  transform: speaking ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>
            
            {/* Mic indicator */}
            <div className="absolute bottom-3 left-3 bg-black/70 rounded-full p-2">
              {speaking ? (
                <Mic size={18} className="text-green-400" />
              ) : (
                <MicOff size={18} className="text-gray-400" />
              )}
            </div>
            
            {/* Name badge */}
            <div className="absolute bottom-3 right-3 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
              AI Interviewer
            </div>
          </div>
        </div>
      </div>
      
      {/* Speaking indicator */}
      {speaking && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-20">
          <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium animate-pulse flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-full animate-ping" />
            Speaking...
          </div>
        </div>
      )}
      
      {/* Sound wave animation when speaking */}
      {speaking && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <div className="absolute bottom-0 w-full flex justify-center items-end h-8 overflow-hidden">
            <div className="flex space-x-1 h-full items-end">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="w-1 bg-primary/40 rounded-full"
                  style={{
                    height: `${Math.max(4, (Math.sin(Date.now() / 200 + i) + 1) * 10)}px`,
                    animation: `speechWave ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      <style>
        {`
          @keyframes speechWave {
            0% {
              transform: scaleY(0.3);
            }
            100% {
              transform: scaleY(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Interviewer3DAvatar;
