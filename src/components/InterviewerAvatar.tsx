
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Group } from 'three';

// 3D Model component representing a realistic human interviewer
const InterviewerModel = () => {
  const group = useRef<Group>(null);
  
  // Animation for subtle natural movement
  useFrame((state) => {
    if (group.current) {
      // More natural subtle breathing and micro-movements
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.04;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.01;
      
      // Subtle breathing effect
      const breathingIntensity = 0.015;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * breathingIntensity - 0.9;
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]} scale={1.5}>
      {/* Shoulders and upper torso */}
      <mesh position={[0, -1.7, 0]} scale={[1.6, 0.6, 0.8]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1a237e" roughness={0.7} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, -1.2, 0]} scale={[0.25, 0.4, 0.25]}>
        <cylinderGeometry args={[1, 1.1, 1, 16]} />
        <meshStandardMaterial color="#e6c9b3" roughness={0.3} />
      </mesh>
      
      {/* Shirt collar */}
      <mesh position={[0, -1.3, 0.2]} rotation={[Math.PI * 0.15, 0, 0]} scale={[0.6, 0.12, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="white" roughness={0.3} />
      </mesh>
      
      {/* Tie or accessories */}
      <mesh position={[0, -1.4, 0.25]} scale={[0.1, 0.3, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#b71c1c" roughness={0.4} />
      </mesh>
      
      {/* Head base - improved shape */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial 
          color="#e6c9b3" 
          roughness={0.4} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Jaw and chin definition */}
      <mesh position={[0, -0.4, 0.1]} scale={[0.75, 0.4, 0.7]}>
        <sphereGeometry args={[0.8, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#e6c9b3" roughness={0.4} />
      </mesh>
      
      {/* Add facial details */}
      {/* Eyes with more details */}
      <group position={[0, 0.1, 0]}>
        {/* Eye sockets - add depth */}
        <mesh position={[0.25, 0.1, 0.62]} rotation={[0, 0, 0]} scale={[0.2, 0.1, 0.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#d2b094" roughness={0.5} />
        </mesh>
        <mesh position={[-0.25, 0.1, 0.62]} rotation={[0, 0, 0]} scale={[0.2, 0.1, 0.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#d2b094" roughness={0.5} />
        </mesh>
        
        {/* Eye whites */}
        <mesh position={[0.25, 0.1, 0.67]} scale={[0.18, 0.09, 0.08]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="white" roughness={0.1} />
        </mesh>
        <mesh position={[-0.25, 0.1, 0.67]} scale={[0.18, 0.09, 0.08]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="white" roughness={0.1} />
        </mesh>
        
        {/* Irises - more detailed */}
        <mesh position={[0.25, 0.1, 0.76]} scale={[0.09, 0.09, 0.02]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#2e5cb8" roughness={0.1} metalness={0.1} />
        </mesh>
        <mesh position={[-0.25, 0.1, 0.76]} scale={[0.09, 0.09, 0.02]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#2e5cb8" roughness={0.1} metalness={0.1} />
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
        
        {/* Eyelids */}
        <mesh position={[0.25, 0.15, 0.72]} rotation={[Math.PI * 0.08, 0, 0]} scale={[0.19, 0.06, 0.05]}>
          <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#d2b094" roughness={0.5} />
        </mesh>
        <mesh position={[-0.25, 0.15, 0.72]} rotation={[Math.PI * 0.08, 0, 0]} scale={[0.19, 0.06, 0.05]}>
          <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#d2b094" roughness={0.5} />
        </mesh>
      </group>
      
      {/* Eyebrows - more natural */}
      <mesh position={[0.25, 0.28, 0.67]} rotation={[0, 0, -0.1]} scale={[0.22, 0.04, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#362617" roughness={0.9} />
      </mesh>
      <mesh position={[-0.25, 0.28, 0.67]} rotation={[0, 0, 0.1]} scale={[0.22, 0.04, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#362617" roughness={0.9} />
      </mesh>
      
      {/* Nose - improved shape */}
      <mesh position={[0, -0.05, 0.75]} scale={[0.12, 0.25, 0.2]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#e6c9b3" roughness={0.4} />
      </mesh>
      
      {/* Nostrils */}
      <mesh position={[0.06, -0.15, 0.85]} scale={[0.03, 0.02, 0.03]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#2e1a12" roughness={0.7} />
      </mesh>
      <mesh position={[-0.06, -0.15, 0.85]} scale={[0.03, 0.02, 0.03]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#2e1a12" roughness={0.7} />
      </mesh>
      
      {/* Mouth - more realistic lips */}
      <group position={[0, -0.3, 0.7]}>
        {/* Upper lip */}
        <mesh position={[0, 0.03, 0]} scale={[0.3, 0.06, 0.1]}>
          <boxGeometry args={[1, 1, 1]} radius={0.2} />
          <meshStandardMaterial color="#c85a54" roughness={0.4} />
        </mesh>
        
        {/* Lower lip - slightly bigger */}
        <mesh position={[0, -0.05, 0]} scale={[0.32, 0.08, 0.12]}>
          <boxGeometry args={[1, 1, 1]} radius={0.3} />
          <meshStandardMaterial color="#c85a54" roughness={0.3} />
        </mesh>
      </group>
      
      {/* Cheeks - add more dimension to face */}
      <mesh position={[0.5, -0.1, 0.3]} scale={[0.3, 0.3, 0.3]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#e6c9b3" roughness={0.4} />
      </mesh>
      <mesh position={[-0.5, -0.1, 0.3]} scale={[0.3, 0.3, 0.3]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#e6c9b3" roughness={0.4} />
      </mesh>
      
      {/* Ears - improved shape */}
      <mesh position={[0.82, 0, 0]} scale={[0.08, 0.2, 0.08]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial color="#e6c9b3" roughness={0.4} />
      </mesh>
      <mesh position={[-0.82, 0, 0]} scale={[0.08, 0.2, 0.08]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial color="#e6c9b3" roughness={0.4} />
      </mesh>
      
      {/* Inner ear details */}
      <mesh position={[0.9, 0, 0.05]} rotation={[0, -Math.PI / 2, 0]} scale={[0.05, 0.1, 0.05]}>
        <torusGeometry args={[0.5, 0.2, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#d2b094" roughness={0.5} />
      </mesh>
      <mesh position={[-0.9, 0, 0.05]} rotation={[0, Math.PI / 2, 0]} scale={[0.05, 0.1, 0.05]}>
        <torusGeometry args={[0.5, 0.2, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#d2b094" roughness={0.5} />
      </mesh>
      
      {/* Hair - improved style */}
      <mesh position={[0, 0.5, 0]} scale={[0.85, 0.4, 0.85]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#362617" roughness={0.8} />
      </mesh>
      
      {/* Hair detail - front strands */}
      <mesh position={[0.3, 0.45, 0.5]} rotation={[0.1, 0.2, 0.1]} scale={[0.1, 0.2, 0.1]}>
        <boxGeometry args={[1, 1, 1]} radius={0.2} />
        <meshStandardMaterial color="#362617" roughness={0.9} />
      </mesh>
      <mesh position={[-0.3, 0.45, 0.5]} rotation={[0.1, -0.2, -0.1]} scale={[0.1, 0.2, 0.1]}>
        <boxGeometry args={[1, 1, 1]} radius={0.2} />
        <meshStandardMaterial color="#362617" roughness={0.9} />
      </mesh>
      
      {/* Improved suit details */}
      <mesh position={[0.9, -1.7, 0]} scale={[0.65, 0.6, 0.8]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1a237e" roughness={0.7} />
      </mesh>
      <mesh position={[-0.9, -1.7, 0]} scale={[0.65, 0.6, 0.8]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1a237e" roughness={0.7} />
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
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={0.8} castShadow />
        <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={0.4} castShadow />
        <spotLight position={[0, 5, -5]} angle={0.15} penumbra={1} intensity={0.3} castShadow />
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
