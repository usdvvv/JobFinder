
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface Interviewer3DAvatarProps {
  speaking?: boolean;
  size?: number;
}

// More stylized yet realistic 3D interviewer model
function InterviewerModel({ speaking }: { speaking?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const eyeLeft = useRef<THREE.Mesh>(null);
  const eyeRight = useRef<THREE.Mesh>(null);
  const mouth = useRef<THREE.Mesh>(null);
  
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
      
      // Stylized mouth animation when speaking
      if (speaking && mouth.current) {
        // Using a more pronounced, cartoon-like mouth animation
        const mouthScaleY = 0.3 + Math.abs(Math.sin(state.clock.elapsedTime * 5)) * 0.7;
        mouth.current.scale.y = mouthScaleY;
        // Change mouth color slightly to add depth when open
        (mouth.current.material as THREE.MeshStandardMaterial).color.setRGB(
          0.8 - mouthScaleY * 0.2,
          0.2 - mouthScaleY * 0.1,
          0.2 - mouthScaleY * 0.1
        );
      } else if (mouth.current) {
        mouth.current.scale.y = 0.3;
        (mouth.current.material as THREE.MeshStandardMaterial).color.setRGB(0.8, 0.2, 0.2);
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
        
        {/* Stylized 2D-looking mouth that stands out */}
        <mesh 
          ref={mouth} 
          position={[0, -0.2, 0.47]} 
          rotation={[Math.PI * 0.1, 0, 0]}
          scale={[1, 0.3, 0.1]} // Initially thin
        >
          <planeGeometry args={[0.4, 0.2]} />
          <meshStandardMaterial 
            color="#cc3333" 
            side={THREE.DoubleSide}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        
        {/* Stylized teeth - visible when speaking */}
        {speaking && (
          <mesh 
            position={[0, -0.18, 0.48]} 
            rotation={[Math.PI * 0.1, 0, 0]}
            scale={[0.38, 0.06, 0.01]}
          >
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial 
              color="white"
              emissive="white"
              emissiveIntensity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
        
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
        {/* Enhanced lighting setup for better facial features */}
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
        <pointLight position={[0, -0.2, 2]} intensity={0.8} color="#ffffff" />
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
      
      {/* New: Animated sound waves overlay when speaking */}
      {speaking && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className="w-1 bg-primary/30 rounded-full"
                style={{
                  height: `${20 + i * 10}px`,
                  animation: `speechWave ${0.5 + i * 0.1}s ease-in-out infinite alternate`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Fix: Replace the style jsx with regular style element */}
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
