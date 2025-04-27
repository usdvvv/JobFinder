import { useState, useEffect, Suspense } from 'react';
import { Video, Mic, MicOff, Clock } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ speaking }: { speaking: boolean }) {
  const { scene } = useGLTF('/white_mesh.glb');
  
  useEffect(() => {
    // Animate based on speaking state
    if (scene.animations && scene.animations.length > 0) {
      // Add animation logic here when your model has animations
    }
  }, [speaking, scene]);

  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
}

interface Interviewer3DAvatarProps {
  speaking?: boolean;
  size?: number;
}

const Interviewer3DAvatar = ({ speaking = false, size = 300 }: Interviewer3DAvatarProps) => {
  const [currentTime, setCurrentTime] = useState('');
  const [interviewerState, setInterviewerState] = useState<'listening' | 'speaking' | 'thinking'>('listening');
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  
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
  
  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      <div 
        className="rounded-lg overflow-hidden shadow-lg border border-gray-200" 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          background: 'linear-gradient(to right, #1a1a1a, #2a2a2a)',
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
        
        {/* 3D Model Container */}
        <div className="w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <Model speaking={speaking} />
            </Suspense>
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI/2}
              maxPolarAngle={Math.PI/2}
            />
          </Canvas>
        </div>
        
        {/* Mic indicator */}
        <div className="absolute bottom-3 left-3 bg-black/70 rounded-full p-2 z-10">
          {speaking ? (
            <Mic size={18} className="text-green-400" />
          ) : (
            <MicOff size={18} className="text-gray-400" />
          )}
        </div>
        
        {/* Name badge */}
        <div className="absolute bottom-3 right-3 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium z-10">
          AI Interviewer
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
    </div>
  );
};

export default Interviewer3DAvatar;
