
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, RoundedBox } from '@react-three/drei';
import { Group } from 'three';

// Improved 3D Model component representing a realistic human interviewer
const InterviewerModel = () => {
  const group = useRef<Group>(null);
  
  // Animation for subtle natural movement
  useFrame((state) => {
    if (group.current) {
      // More natural subtle breathing and micro-movements
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.03;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.01;
      
      // Subtle breathing effect
      const breathingIntensity = 0.01;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * breathingIntensity;
    }
  });

  return (
    <group ref={group} position={[0, -1.2, 0]} scale={1.5}>
      {/* Body - Upper torso with better proportions */}
      <mesh position={[0, -0.9, 0]} scale={[1.8, 0.8, 0.9]}>
        <boxGeometry />
        <meshStandardMaterial color="#2c3e50" roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Shoulders with more realistic shape */}
      <mesh position={[-1.0, -0.7, 0]} scale={[0.5, 0.3, 0.8]} rotation={[0, 0, -0.2]}>
        <boxGeometry />
        <meshStandardMaterial color="#2c3e50" roughness={0.6} metalness={0.1} />
      </mesh>
      
      <mesh position={[1.0, -0.7, 0]} scale={[0.5, 0.3, 0.8]} rotation={[0, 0, 0.2]}>
        <boxGeometry />
        <meshStandardMaterial color="#2c3e50" roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Neck with better proportions */}
      <mesh position={[0, -0.2, 0]} scale={[0.3, 0.5, 0.3]}>
        <cylinderGeometry args={[1, 1.1, 1, 32]} />
        <meshStandardMaterial color="#e0ac85" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Collar */}
      <mesh position={[0, -0.5, 0.2]} rotation={[Math.PI * 0.1, 0, 0]} scale={[0.8, 0.15, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="white" roughness={0.3} />
      </mesh>
      
      {/* Shirt open */}
      <mesh position={[0, -0.7, 0.3]} scale={[0.5, 0.3, 0.1]}>
        <boxGeometry />
        <meshStandardMaterial color="#ecf0f1" roughness={0.4} />
      </mesh>
      
      {/* Tie */}
      <mesh position={[0, -0.7, 0.35]} scale={[0.12, 0.35, 0.05]}>
        <boxGeometry />
        <meshStandardMaterial color="#c0392b" roughness={0.4} />
      </mesh>
      
      {/* Head base - more realistic skull shape */}
      <mesh position={[0, 0.5, 0]} scale={[0.8, 0.95, 0.75]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#e0ac85" 
          roughness={0.4} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Face base shape - extended slightly for jaw */}
      <mesh position={[0, 0.2, 0.1]} scale={[0.8, 0.6, 0.7]}>
        <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial color="#e0ac85" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Jaw and chin - more defined */}
      <mesh position={[0, 0.05, 0.2]} scale={[0.65, 0.3, 0.6]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#e0ac85" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Eye area - orbital bones */}
      <mesh position={[0.25, 0.7, 0.4]} rotation={[0.2, 0, 0]} scale={[0.25, 0.12, 0.15]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#d69d77" roughness={0.5} />
      </mesh>
      <mesh position={[-0.25, 0.7, 0.4]} rotation={[0.2, 0, 0]} scale={[0.25, 0.12, 0.15]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#d69d77" roughness={0.5} />
      </mesh>
      
      {/* Eye whites */}
      <mesh position={[0.25, 0.7, 0.51]} scale={[0.18, 0.1, 0.09]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.1} />
      </mesh>
      <mesh position={[-0.25, 0.7, 0.51]} scale={[0.18, 0.1, 0.09]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.1} />
      </mesh>
      
      {/* Irises with more natural detail */}
      <mesh position={[0.25, 0.7, 0.6]} scale={[0.09, 0.09, 0.02]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#3c6382" roughness={0.1} metalness={0.3} />
      </mesh>
      <mesh position={[-0.25, 0.7, 0.6]} scale={[0.09, 0.09, 0.02]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#3c6382" roughness={0.1} metalness={0.3} />
      </mesh>
      
      {/* Pupils */}
      <mesh position={[0.25, 0.7, 0.62]} scale={[0.05, 0.05, 0.01]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="black" roughness={0.1} />
      </mesh>
      <mesh position={[-0.25, 0.7, 0.62]} scale={[0.05, 0.05, 0.01]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="black" roughness={0.1} />
      </mesh>
      
      {/* Upper eyelids */}
      <mesh position={[0.25, 0.75, 0.55]} rotation={[Math.PI * 0.1, 0, 0]} scale={[0.2, 0.06, 0.05]}>
        <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#d69d77" roughness={0.4} />
      </mesh>
      <mesh position={[-0.25, 0.75, 0.55]} rotation={[Math.PI * 0.1, 0, 0]} scale={[0.2, 0.06, 0.05]}>
        <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#d69d77" roughness={0.4} />
      </mesh>
      
      {/* Lower eyelids */}
      <mesh position={[0.25, 0.64, 0.55]} rotation={[Math.PI * -0.1, 0, 0]} scale={[0.2, 0.05, 0.05]}>
        <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5]} />
        <meshStandardMaterial color="#d69d77" roughness={0.4} />
      </mesh>
      <mesh position={[-0.25, 0.64, 0.55]} rotation={[Math.PI * -0.1, 0, 0]} scale={[0.2, 0.05, 0.05]}>
        <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5]} />
        <meshStandardMaterial color="#d69d77" roughness={0.4} />
      </mesh>
      
      {/* Eyebrows with better shape */}
      <RoundedBox position={[0.25, 0.85, 0.5]} rotation={[0, 0, Math.PI * -0.05]} scale={[0.22, 0.04, 0.03]} radius={0.01} smoothness={4}>
        <meshStandardMaterial color="#2c3e50" roughness={0.9} />
      </RoundedBox>
      <RoundedBox position={[-0.25, 0.85, 0.5]} rotation={[0, 0, Math.PI * 0.05]} scale={[0.22, 0.04, 0.03]} radius={0.01} smoothness={4}>
        <meshStandardMaterial color="#2c3e50" roughness={0.9} />
      </RoundedBox>
      
      {/* Nose with better shape */}
      <mesh position={[0, 0.45, 0.65]} scale={[0.15, 0.22, 0.2]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
        <meshStandardMaterial color="#d69d77" roughness={0.4} />
      </mesh>
      
      {/* Nostrils */}
      <mesh position={[0.06, 0.36, 0.79]} scale={[0.04, 0.02, 0.03]} rotation={[Math.PI * 0.1, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#222" roughness={0.7} />
      </mesh>
      <mesh position={[-0.06, 0.36, 0.79]} scale={[0.04, 0.02, 0.03]} rotation={[Math.PI * 0.1, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#222" roughness={0.7} />
      </mesh>
      
      {/* Mouth - more realistic lips */}
      <RoundedBox position={[0, 0.22, 0.6]} scale={[0.3, 0.05, 0.08]} radius={0.04} smoothness={4}>
        <meshStandardMaterial color="#c23616" roughness={0.4} />
      </RoundedBox>
      
      <RoundedBox position={[0, 0.15, 0.6]} scale={[0.28, 0.06, 0.09]} radius={0.04} smoothness={4}>
        <meshStandardMaterial color="#b33517" roughness={0.3} />
      </RoundedBox>
      
      {/* Cheeks - more natural contour */}
      <mesh position={[0.4, 0.4, 0.25]} scale={[0.3, 0.3, 0.3]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#e0ac85" roughness={0.4} />
      </mesh>
      <mesh position={[-0.4, 0.4, 0.25]} scale={[0.3, 0.3, 0.3]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#e0ac85" roughness={0.4} />
      </mesh>
      
      {/* Ears - improved shape and detail */}
      <mesh position={[0.82, 0.5, 0]} scale={[0.08, 0.2, 0.08]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#e0ac85" roughness={0.4} />
      </mesh>
      <mesh position={[-0.82, 0.5, 0]} scale={[0.08, 0.2, 0.08]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#e0ac85" roughness={0.4} />
      </mesh>
      
      {/* Inner ear details */}
      <mesh position={[0.85, 0.5, 0.05]} rotation={[0, -Math.PI / 2, 0]} scale={[0.05, 0.1, 0.06]}>
        <torusGeometry args={[0.5, 0.2, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#d69d77" roughness={0.5} />
      </mesh>
      <mesh position={[-0.85, 0.5, 0.05]} rotation={[0, Math.PI / 2, 0]} scale={[0.05, 0.1, 0.06]}>
        <torusGeometry args={[0.5, 0.2, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#d69d77" roughness={0.5} />
      </mesh>
      
      {/* Hair - more natural, modern style */}
      <mesh position={[0, 1.05, 0]} scale={[0.85, 0.45, 0.8]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.8} />
      </mesh>
      
      {/* Side hair */}
      <mesh position={[0.65, 0.8, 0.2]} scale={[0.2, 0.4, 0.3]} rotation={[0, 0, Math.PI * 0.15]}>
        <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.8} />
      </mesh>
      <mesh position={[-0.65, 0.8, 0.2]} scale={[0.2, 0.4, 0.3]} rotation={[0, 0, Math.PI * -0.15]}>
        <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.8} />
      </mesh>
      
      {/* Front hair details */}
      <RoundedBox position={[0.3, 1.0, 0.35]} rotation={[Math.PI * 0.05, 0, Math.PI * 0.05]} scale={[0.15, 0.2, 0.15]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#2c3e50" roughness={0.9} />
      </RoundedBox>
      <RoundedBox position={[-0.3, 1.0, 0.35]} rotation={[Math.PI * 0.05, 0, Math.PI * -0.05]} scale={[0.15, 0.2, 0.15]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#2c3e50" roughness={0.9} />
      </RoundedBox>
      
      {/* Slight beard shadow effect */}
      <mesh position={[0, 0.1, 0.57]} scale={[0.35, 0.2, 0.2]} rotation={[Math.PI * 0.1, 0, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#2c3e50" transparent={true} opacity={0.15} roughness={0.9} />
      </mesh>
      
      {/* Add some skin texture variation with slight blush */}
      <mesh position={[0.35, 0.35, 0.45]} scale={[0.2, 0.15, 0.1]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#e74c3c" transparent={true} opacity={0.1} roughness={0.6} />
      </mesh>
      <mesh position={[-0.35, 0.35, 0.45]} scale={[0.2, 0.15, 0.1]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#e74c3c" transparent={true} opacity={0.1} roughness={0.6} />
      </mesh>

      {/* Suit details */}
      <mesh position={[0, -1.3, 0]} scale={[1.8, 0.6, 0.9]}>
        <boxGeometry />
        <meshStandardMaterial color="#2c3e50" roughness={0.7} metalness={0.2} />
      </mesh>
      
      {/* Suit button */}
      <mesh position={[0, -1.0, 0.32]} scale={[0.1, 0.1, 0.05]}>
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial color="#34495e" roughness={0.4} metalness={0.6} />
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
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
      }}
    >
      <Canvas camera={{ position: [0, 0, 4.5], fov: 30 }}> {/* Adjusted camera for better view */}
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
