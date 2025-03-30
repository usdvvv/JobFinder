
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Group } from 'three';

// Simple abstract 3D Model with clear mouth animation
const InterviewerModel = ({ speaking = false }) => {
  const group = useRef<Group>(null);
  const [mouthOpen, setMouthOpen] = useState(0);
  
  // Add mouth animation when speaking
  useEffect(() => {
    if (speaking) {
      // Simple mouth movement pattern
      const interval = setInterval(() => {
        setMouthOpen(Math.random() * 0.6 + 0.2); // Good visible range
      }, 150);
      
      return () => clearInterval(interval);
    } else {
      setMouthOpen(0);
    }
  }, [speaking]);
  
  // Subtle animation for natural movement
  useFrame((state) => {
    if (group.current) {
      // Gentle floating movement
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group}>
      {/* Simple abstract head - just a sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#6a89cc" 
          roughness={0.4}
        />
      </mesh>
      
      {/* Simple eyes - white circles */}
      <mesh position={[0.4, 0.2, 0.85]} rotation={[0, 0, 0]} scale={[0.15, 0.15, 0.05]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      <mesh position={[-0.4, 0.2, 0.85]} rotation={[0, 0, 0]} scale={[0.15, 0.15, 0.05]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Eye pupils */}
      <mesh position={[0.4, 0.2, 0.9]} rotation={[0, 0, 0]} scale={[0.06, 0.06, 0.01]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      <mesh position={[-0.4, 0.2, 0.9]} rotation={[0, 0, 0]} scale={[0.06, 0.06, 0.01]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Very simple mouth - just a line that scales when speaking */}
      <mesh 
        position={[0, -0.2, 0.85]} 
        scale={[0.4, speaking ? mouthOpen * 0.2 : 0.02, 0.01]}
      >
        <planeGeometry />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  );
};

// Main component that renders the 3D interviewer
const InterviewerAvatar = ({ speaking = false, size = 300 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '0 auto',
        backgroundColor: '#e0f7fa', // Light blue background
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}
    >
      <Canvas camera={{ position: [0, 0, 2.5], fov: 35 }}>
        <ambientLight intensity={1.2} />
        <spotLight position={[0, 1, 5]} angle={0.3} penumbra={1} intensity={1} />
        <InterviewerModel speaking={speaking} />
        <Environment preset="dawn" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.3}
        />
      </Canvas>
      
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
