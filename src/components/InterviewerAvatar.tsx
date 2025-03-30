
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Group, Vector3 } from 'three';

// 3D Model component representing a realistic human interviewer
const InterviewerModel = () => {
  const group = useRef<Group>(null);
  
  // Animation for subtle natural movement
  useFrame((state) => {
    if (group.current) {
      // Subtle breathing and natural head movement
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.01;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02 - 0.9;
    }
  });

  return (
    <group ref={group} position={[0, -0.9, 0]} scale={1.5}>
      {/* Head base */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color="#e1c0ac" 
          roughness={0.2} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Add realistic features */}
      {/* Eyes */}
      <group position={[0, 0.1, 0]}>
        {/* Eye whites */}
        <mesh position={[0.25, 0.1, 0.65]} scale={[0.18, 0.09, 0.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[-0.25, 0.1, 0.65]} scale={[0.18, 0.09, 0.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Irises */}
        <mesh position={[0.25, 0.1, 0.76]} scale={[0.08, 0.08, 0.02]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#5B3256" />
        </mesh>
        <mesh position={[-0.25, 0.1, 0.76]} scale={[0.08, 0.08, 0.02]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#5B3256" />
        </mesh>
        
        {/* Pupils */}
        <mesh position={[0.25, 0.1, 0.78]} scale={[0.04, 0.04, 0.01]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[-0.25, 0.1, 0.78]} scale={[0.04, 0.04, 0.01]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
      
      {/* Eyebrows */}
      <mesh position={[0.25, 0.25, 0.67]} rotation={[0, 0, -0.1]} scale={[0.2, 0.03, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#362617" />
      </mesh>
      <mesh position={[-0.25, 0.25, 0.67]} rotation={[0, 0, 0.1]} scale={[0.2, 0.03, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#362617" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, -0.05, 0.8]} scale={[0.1, 0.2, 0.1]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#e1c0ac" roughness={0.3} />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, -0.3, 0.7]} scale={[0.3, 0.05, 0.1]} receiveShadow>
        <boxGeometry />
        <meshPhongMaterial color="#A54E4E" shininess={100} />
      </mesh>
      
      {/* Ears */}
      <mesh position={[0.8, 0, 0]} rotation={[0, 0, 0]} scale={[0.1, 0.2, 0.1]}>
        <ellipsoidGeometry args={[1, 2, 0.5, 8, 8]} />
        <meshStandardMaterial color="#e1c0ac" roughness={0.3} />
      </mesh>
      <mesh position={[-0.8, 0, 0]} rotation={[0, 0, 0]} scale={[0.1, 0.2, 0.1]}>
        <ellipsoidGeometry args={[1, 2, 0.5, 8, 8]} />
        <meshStandardMaterial color="#e1c0ac" roughness={0.3} />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 0.5, 0]} scale={[0.85, 0.35, 0.85]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#362617" roughness={0.8} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, -0.85, 0]} scale={[0.2, 0.25, 0.2]}>
        <cylinderGeometry />
        <meshStandardMaterial color="#e1c0ac" />
      </mesh>
      
      {/* Upper body hint (shoulders/suit) */}
      <mesh position={[0, -1.2, 0]} scale={[0.9, 0.4, 0.4]}>
        <boxGeometry />
        <meshStandardMaterial color="#1a237e" roughness={0.7} />
      </mesh>
      
      {/* Collar */}
      <mesh position={[0, -1.05, 0.3]} rotation={[Math.PI * 0.1, 0, 0]} scale={[0.5, 0.1, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="white" />
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
        backgroundColor: '#1a1a2e',
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}
    >
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={0.8} castShadow />
        <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={0.4} castShadow />
        <InterviewerModel />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.3}
        />
      </Canvas>
      
      {/* Speech indicator with improved styling */}
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
