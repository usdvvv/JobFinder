
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface Interviewer3DAvatarProps {
  speaking?: boolean;
  size?: number;
}

// This component creates a more realistic 3D interviewer head model
function InterviewerModel({ speaking }: { speaking?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const jaw = useRef<THREE.Mesh>(null);
  const eyeLeft = useRef<THREE.Mesh>(null);
  const eyeRight = useRef<THREE.Mesh>(null);
  const eyebrowLeft = useRef<THREE.Mesh>(null);
  const eyebrowRight = useRef<THREE.Mesh>(null);
  
  // More subtle and natural animation
  useFrame((state) => {
    if (group.current) {
      // Natural head movement - more subtle and realistic
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.01;
      
      // Blinking animation
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
      
      // Eyebrow movement
      if (eyebrowLeft.current && eyebrowRight.current) {
        eyebrowLeft.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
        eyebrowRight.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
      }
      
      // More realistic mouth animation when speaking
      if (speaking && jaw.current) {
        // More natural mouth movement when speaking
        const mouthOpenAmount = Math.abs(Math.sin(state.clock.elapsedTime * 4)) * 0.08;
        jaw.current.position.y = -0.1 - mouthOpenAmount;
      } else if (jaw.current) {
        // Slight movement even when not speaking (appears more alive)
        jaw.current.position.y = -0.1 - Math.sin(state.clock.elapsedTime) * 0.003;
      }
    }
  });
  
  // Define material properties
  const skinMaterialProps = {
    color: new THREE.Color('#e1c0ac'),
    roughness: 0.5,
    metalness: 0.1
  };
  
  // Suit material with subtle shine
  const suitMaterialProps = {
    color: new THREE.Color('#1A1F2C'),
    roughness: 0.6,
    metalness: 0.4
  };
  
  // Hair material with some shine
  const hairMaterialProps = {
    color: new THREE.Color('#222222'),
    roughness: 0.7,
    metalness: 0.2
  };
  
  // Eye whites
  const eyeWhiteMaterialProps = {
    color: new THREE.Color('#ffffff'),
    roughness: 0.1,
    metalness: 0.1
  };
  
  // Eye iris
  const irisMaterialProps = {
    color: new THREE.Color('#3a6186'),
    roughness: 0.1,
    metalness: 0.2
  };
  
  // Lips material with subtle redness
  const lipMaterialProps = {
    color: new THREE.Color('#cc9999'),
    roughness: 0.3,
    metalness: 0.1
  };
  
  return (
    <group ref={group}>
      <group position={[0, 0, 0]} scale={1.8}>
        {/* Head - more realistic oval shape */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial {...skinMaterialProps} />
        </mesh>
        
        {/* Slightly wider at the back for a more realistic skull shape */}
        <mesh position={[0, -0.05, -0.1]}>
          <sphereGeometry args={[0.51, 32, 32]} />
          <meshStandardMaterial {...skinMaterialProps} />
        </mesh>
        
        {/* Hair - more realistic styling */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.52, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.53]} />
          <meshStandardMaterial {...hairMaterialProps} />
        </mesh>
        
        {/* Hair volume on sides */}
        <mesh position={[0.35, 0.1, 0]} rotation={[0, 0, Math.PI * 0.25]}>
          <boxGeometry args={[0.2, 0.3, 0.4]} />
          <meshStandardMaterial {...hairMaterialProps} />
        </mesh>
        
        <mesh position={[-0.35, 0.1, 0]} rotation={[0, 0, -Math.PI * 0.25]}>
          <boxGeometry args={[0.2, 0.3, 0.4]} />
          <meshStandardMaterial {...hairMaterialProps} />
        </mesh>
        
        {/* Ears with more detail */}
        <mesh position={[0.5, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial {...skinMaterialProps} />
        </mesh>
        <mesh position={[0.55, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial {...skinMaterialProps} />
        </mesh>
        
        <mesh position={[-0.5, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial {...skinMaterialProps} />
        </mesh>
        <mesh position={[-0.55, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial {...skinMaterialProps} />
        </mesh>
        
        {/* Eyebrows */}
        <mesh ref={eyebrowLeft} position={[-0.2, 0.2, 0.4]} rotation={[0.1, 0, 0.1]}>
          <boxGeometry args={[0.1, 0.02, 0.03]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        <mesh ref={eyebrowRight} position={[0.2, 0.2, 0.4]} rotation={[0.1, 0, -0.1]}>
          <boxGeometry args={[0.1, 0.02, 0.03]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        {/* Eyes with better shaping */}
        <mesh ref={eyeLeft} position={[-0.2, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial {...eyeWhiteMaterialProps} />
        </mesh>
        <mesh ref={eyeRight} position={[0.2, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial {...eyeWhiteMaterialProps} />
        </mesh>
        
        {/* Iris with more vibrant coloring */}
        <mesh position={[-0.2, 0.1, 0.47]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial {...irisMaterialProps} />
        </mesh>
        <mesh position={[0.2, 0.1, 0.47]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial {...irisMaterialProps} />
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
        
        {/* Nose with more realistic shape */}
        <mesh position={[0, -0.05, 0.45]} rotation={[Math.PI * 0.1, 0, 0]}>
          <coneGeometry args={[0.07, 0.2, 16]} />
          <meshStandardMaterial {...skinMaterialProps} />
        </mesh>
        
        {/* Nostrils */}
        <mesh position={[0.03, -0.08, 0.52]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#3f3f3f" />
        </mesh>
        <mesh position={[-0.03, -0.08, 0.52]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#3f3f3f" />
        </mesh>
        
        {/* Cheeks - add volume to face */}
        <mesh position={[0.25, -0.1, 0.25]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial {...skinMaterialProps} />
        </mesh>
        <mesh position={[-0.25, -0.1, 0.25]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial {...skinMaterialProps} />
        </mesh>
        
        {/* Upper lip */}
        <mesh position={[0, -0.14, 0.42]}>
          <boxGeometry args={[0.2, 0.03, 0.1]} />
          <meshStandardMaterial {...lipMaterialProps} />
        </mesh>
        
        {/* Lower jaw and lip */}
        <group ref={jaw} position={[0, -0.1, 0]}>
          <mesh position={[0, -0.08, 0.42]}>
            <boxGeometry args={[0.2, 0.05, 0.1]} />
            <meshStandardMaterial {...lipMaterialProps} />
          </mesh>
          
          {/* Chin */}
          <mesh position={[0, -0.1, 0.3]}>
            <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial {...skinMaterialProps} />
          </mesh>
        </group>
        
        {/* Neck with more realistic proportions */}
        <mesh position={[0, -0.5, 0]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.5, 32]} />
          <meshStandardMaterial {...skinMaterialProps} />
        </mesh>
        
        {/* Suit with better tailoring */}
        <mesh position={[0, -1.1, 0]}>
          <boxGeometry args={[1, 1, 0.5]} />
          <meshStandardMaterial {...suitMaterialProps} />
        </mesh>
        
        {/* Suit collar */}
        <mesh position={[0, -0.75, 0.2]}>
          <boxGeometry args={[0.6, 0.1, 0.1]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Tie with better shape */}
        <mesh position={[0, -0.9, 0.3]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#b71c1c" roughness={0.4} metalness={0.3} />
        </mesh>
        
        {/* Tie knot */}
        <mesh position={[0, -0.7, 0.3]}>
          <boxGeometry args={[0.15, 0.08, 0.12]} />
          <meshStandardMaterial color="#b71c1c" roughness={0.4} metalness={0.3} />
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
        gl={{ antialias: true }}
      >
        {/* Improved lighting for more realistic appearance */}
        <ambientLight intensity={0.4} />
        
        {/* Key light - main light source from front right */}
        <spotLight 
          position={[3, 2, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.8} 
          castShadow 
          color="#fff5eb"
        />
        
        {/* Fill light - softer light from left side */}
        <pointLight position={[-3, 0, 2]} intensity={0.4} color="#d0f0ff" />
        
        {/* Rim light - highlights edges from behind */}
        <pointLight position={[0, 0, -5]} intensity={0.2} color="#ffffff" />
        
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
