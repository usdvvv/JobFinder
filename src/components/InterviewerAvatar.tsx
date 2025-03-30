
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Group } from 'three';

// Enhanced 3D Model component with better mouth animation
const InterviewerModel = ({ speaking = false }) => {
  const group = useRef<Group>(null);
  const [mouthOpen, setMouthOpen] = useState(0);
  
  // Add mouth animation when speaking
  useEffect(() => {
    if (speaking) {
      // Simulate mouth movement when speaking
      const interval = setInterval(() => {
        setMouthOpen(Math.random() * 0.5);
      }, 150);
      
      return () => clearInterval(interval);
    } else {
      setMouthOpen(0);
    }
  }, [speaking]);
  
  // Subtle animation for natural movement
  useFrame((state) => {
    if (group.current) {
      // Gentle breathing movement
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.02;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.01;
    }
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Head - simplified to abstract shape */}
      <mesh position={[0, 0.5, 0]} scale={[0.8, 0.95, 0.75]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#e0ac85" 
          roughness={0.4} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, -0.2, 0]} scale={[0.3, 0.5, 0.3]}>
        <cylinderGeometry args={[0.5, 0.6, 1, 32]} />
        <meshStandardMaterial color="#e0ac85" roughness={0.3} />
      </mesh>
      
      {/* Upper body - Simplified suit */}
      <mesh position={[0, -1.2, 0]} scale={[1.6, 1.5, 0.8]}>
        <boxGeometry />
        <meshStandardMaterial color="#2c3e50" roughness={0.6} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.25, 0.7, 0.6]} scale={[0.1, 0.1, 0.1]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#3c6382" />
      </mesh>
      <mesh position={[-0.25, 0.7, 0.6]} scale={[0.1, 0.1, 0.1]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#3c6382" />
      </mesh>
      
      {/* Simplified ears */}
      <mesh position={[0.8, 0.5, 0]} scale={[0.1, 0.2, 0.1]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#e0ac85" />
      </mesh>
      <mesh position={[-0.8, 0.5, 0]} scale={[0.1, 0.2, 0.1]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#e0ac85" />
      </mesh>
      
      {/* Enhanced mouth with animation */}
      <mesh position={[0, 0.3, 0.6]} scale={[0.3, mouthOpen > 0 ? 0.03 + mouthOpen : 0.03, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Mouth interior - visible when mouth opens */}
      {mouthOpen > 0 && (
        <mesh position={[0, 0.3 - mouthOpen/4, 0.65]} scale={[0.28, mouthOpen, 0.05]}>
          <boxGeometry />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
      )}
      
      {/* Simple hair */}
      <mesh position={[0, 0.9, 0]} scale={[0.82, 0.4, 0.77]}>
        <sphereGeometry args={[1, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.8} />
      </mesh>
      
      {/* Shirt collar */}
      <mesh position={[0, -0.5, 0.35]} scale={[0.6, 0.1, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Tie */}
      <mesh position={[0, -0.8, 0.4]} scale={[0.1, 0.3, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#c0392b" />
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
        backgroundColor: '#f5f5f5', // Lighter background for better visibility
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}
    >
      <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }}> {/* Adjusted camera for better view */}
        <ambientLight intensity={0.8} /> {/* Increased ambient light */}
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={0.8} />
        <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={0.4} />
        <InterviewerModel speaking={speaking} />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.9}
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
