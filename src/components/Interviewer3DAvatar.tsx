
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface Interviewer3DAvatarProps {
  speaking?: boolean;
  size?: number;
}

// More realistic 3D interviewer head model
function InterviewerModel({ speaking }: { speaking?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const jaw = useRef<THREE.Group>(null);
  const eyeLeft = useRef<THREE.Mesh>(null);
  const eyeRight = useRef<THREE.Mesh>(null);
  
  // Subtle animations for realistic movement
  useFrame((state) => {
    if (group.current) {
      // Natural head movement
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.01;
      
      // Occasional blinking
      if (eyeLeft.current && eyeRight.current) {
        // Random blinking every few seconds
        if (Math.sin(state.clock.elapsedTime * 0.5) > 0.98) {
          eyeLeft.current.scale.y = 0.1;
          eyeRight.current.scale.y = 0.1;
        } else {
          eyeLeft.current.scale.y = 1;
          eyeRight.current.scale.y = 1;
        }
      }
      
      // More pronounced mouth movement when speaking
      if (speaking && jaw.current) {
        const mouthOpenAmount = Math.abs(Math.sin(state.clock.elapsedTime * 4)) * 0.12; // Larger movement
        jaw.current.position.y = -0.15 - mouthOpenAmount;
      } else if (jaw.current) {
        jaw.current.position.y = -0.15 - Math.sin(state.clock.elapsedTime) * 0.004;
      }
    }
  });
  
  return (
    <group ref={group}>
      <group position={[0, 0, 0]} scale={1.8}>
        {/* Head - simple realistic shape */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial 
            color="#e1c0ac"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.52, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.53]} />
          <meshStandardMaterial 
            color="#222222"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
        
        {/* Ears */}
        <mesh position={[0.5, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#e1c0ac"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
        
        <mesh position={[-0.5, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#e1c0ac"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
        
        {/* Eyes */}
        <mesh ref={eyeLeft} position={[-0.2, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        <mesh ref={eyeRight} position={[0.2, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Iris */}
        <mesh position={[-0.2, 0.1, 0.47]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#3a6186" />
        </mesh>
        
        <mesh position={[0.2, 0.1, 0.47]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#3a6186" />
        </mesh>
        
        {/* Pupils */}
        <mesh position={[-0.2, 0.1, 0.49]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        
        <mesh position={[0.2, 0.1, 0.49]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        
        {/* Nose - simpler shape */}
        <mesh position={[0, -0.05, 0.45]} rotation={[Math.PI * 0.1, 0, 0]}>
          <coneGeometry args={[0.07, 0.2, 16]} />
          <meshStandardMaterial color="#e1c0ac" />
        </mesh>
        
        {/* Mouth area - completely redesigned for more realism */}
        {/* Mouth outline - adds definition */}
        <mesh position={[0, -0.2, 0.43]}>
          <ringGeometry args={[0.12, 0.15, 32, 1, 0, Math.PI]} />
          <meshStandardMaterial color="#be8276" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Upper lip - more natural shape */}
        <mesh position={[0, -0.17, 0.45]}>
          <boxGeometry args={[0.28, 0.04, 0.07]} />
          <meshStandardMaterial color="#c9817c" />
        </mesh>
        
        {/* Lower jaw and lip - more realistic movement */}
        <group ref={jaw} position={[0, -0.15, 0]}>
          {/* Lower lip with better shape */}
          <mesh position={[0, -0.1, 0.44]}>
            <boxGeometry args={[0.28, 0.06, 0.07]} />
            <meshStandardMaterial color="#c9817c" />
          </mesh>
          
          {/* Chin */}
          <mesh position={[0, -0.15, 0.3]}>
            <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#e1c0ac" />
          </mesh>
        </group>
        
        {/* Mouth interior - deeper and more visible */}
        <mesh position={[0, -0.2, 0.47]}>
          <boxGeometry args={[0.25, 0.10, 0.1]} />
          <meshStandardMaterial color="#5e0505" />
        </mesh>
        
        {/* Teeth - adding teeth for realism */}
        <mesh position={[0, -0.17, 0.47]}>
          <boxGeometry args={[0.24, 0.03, 0.03]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Lower teeth */}
        <mesh position={[0, -0.24, 0.47]} visible={speaking}>
          <boxGeometry args={[0.24, 0.03, 0.03]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Neck */}
        <mesh position={[0, -0.5, 0]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.5, 32]} />
          <meshStandardMaterial color="#e1c0ac" />
        </mesh>
        
        {/* Simple suit */}
        <mesh position={[0, -1.1, 0]}>
          <boxGeometry args={[1, 1, 0.5]} />
          <meshStandardMaterial color="#1A1F2C" />
        </mesh>
        
        {/* Collar */}
        <mesh position={[0, -0.75, 0.2]}>
          <boxGeometry args={[0.6, 0.1, 0.1]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Tie */}
        <mesh position={[0, -0.9, 0.3]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#b71c1c" />
        </mesh>
      </group>
    </group>
  );
}

const Interviewer3DAvatar = ({ speaking = false, size = 300 }: Interviewer3DAvatarProps) => {
  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Improved lighting setup for better facial features */}
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[3, 2, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.8} 
          color="#fff5eb"
        />
        <pointLight position={[-3, 0, 2]} intensity={0.4} color="#d0f0ff" />
        {/* Enhanced light to highlight mouth movements */}
        <pointLight position={[0, -0.2, 2]} intensity={0.5} color="#ffffff" />
        {/* Soft fill light from below */}
        <pointLight position={[0, -1, 1]} intensity={0.2} color="#ffe0d0" />
        
        <InterviewerModel speaking={speaking} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2 - 0.4} 
          maxPolarAngle={Math.PI / 2 + 0.4}
          rotateSpeed={0.3}
          enableDamping={true}
          dampingFactor={0.05}
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
