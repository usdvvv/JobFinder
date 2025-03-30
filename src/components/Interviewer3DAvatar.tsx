
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface Interviewer3DAvatarProps {
  speaking?: boolean;
  size?: number;
}

// This component creates a 3D interviewer head model
function InterviewerModel({ speaking }: { speaking?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const jaw = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Subtle head movement to make it look alive
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      
      // Mouth animation when speaking
      if (speaking && jaw.current) {
        jaw.current.rotation.x = Math.sin(state.clock.elapsedTime * 10) * 0.1;
      } else if (jaw.current) {
        jaw.current.rotation.x = 0;
      }
    }
  });
  
  return (
    <group ref={group}>
      <group position={[0, 0, 0]} scale={1.8}>
        {/* Head */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#f2d2bd" roughness={0.5} metalness={0.1} />
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.51, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.8} metalness={0.1} />
        </mesh>
        
        {/* Ears */}
        <mesh position={[0.5, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#f2d2bd" roughness={0.5} metalness={0.1} />
        </mesh>
        <mesh position={[-0.5, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#f2d2bd" roughness={0.5} metalness={0.1} />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[0.2, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" roughness={0.1} metalness={0} />
        </mesh>
        <mesh position={[-0.2, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" roughness={0.1} metalness={0} />
        </mesh>
        
        {/* Pupils */}
        <mesh position={[0.2, 0.1, 0.48]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.1} metalness={0.1} />
        </mesh>
        <mesh position={[-0.2, 0.1, 0.48]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.1} metalness={0.1} />
        </mesh>
        
        {/* Nose */}
        <mesh position={[0, -0.05, 0.5]}>
          <coneGeometry args={[0.08, 0.2, 16]} />
          <meshStandardMaterial color="#f2d2bd" roughness={0.7} metalness={0.1} />
        </mesh>
        
        {/* Face */}
        <mesh position={[0, -0.15, 0.3]} ref={jaw}>
          <boxGeometry args={[0.4, 0.1, 0.3]} />
          <meshStandardMaterial color="#f2d2bd" roughness={0.5} metalness={0.1} />
        </mesh>
        
        {/* Neck */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.5, 32]} />
          <meshStandardMaterial color="#f2d2bd" roughness={0.5} metalness={0.1} />
        </mesh>
        
        {/* Suit */}
        <mesh position={[0, -1.1, 0]}>
          <boxGeometry args={[1, 1, 0.5]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.7} metalness={0.2} />
        </mesh>
        
        {/* Tie */}
        <mesh position={[0, -0.9, 0.3]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#b71c1c" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

const Interviewer3DAvatar = ({ speaking = false, size = 300 }: Interviewer3DAvatarProps) => {
  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Three-point lighting setup for realistic rendering */}
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        
        <InterviewerModel speaking={speaking} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2 - 0.5} 
          maxPolarAngle={Math.PI / 2 + 0.5}
          rotateSpeed={0.5}
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

export default Interviewer3DAvatar;
