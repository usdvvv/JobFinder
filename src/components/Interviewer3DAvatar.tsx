
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface Interviewer3DAvatarProps {
  speaking?: boolean;
  size?: number;
}

// This component represents our 3D model with animations
function InterviewerModel({ speaking }: { speaking?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const jawBone = useRef<THREE.Bone | null>(null);
  
  // Load the 3D model (using a placeholder path - we'll need to update this)
  const { scene, animations } = useGLTF('/robot.glb');
  
  useEffect(() => {
    if (scene) {
      // Set realistic materials
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Create realistic skin material
          if (child.name.includes('head') || child.name.includes('face')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf2d2bd, // Skin tone
              roughness: 0.5,
              metalness: 0.1,
            });
          }
          
          // Create suit material
          if (child.name.includes('suit') || child.name.includes('jacket')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x2c3e50, // Dark blue suit
              roughness: 0.7,
              metalness: 0.2,
            });
          }
          
          // Hair material
          if (child.name.includes('hair')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x3a3a3a, // Dark hair
              roughness: 0.8,
              metalness: 0.1,
            });
          }
        }
      });
      
      // Find jaw/mouth bones for animation
      scene.traverse((node) => {
        if (node.name.includes('jaw') || node.name.includes('mouth')) {
          jawBone.current = node as THREE.Bone;
        }
      });
    }
  }, [scene]);
  
  // Animation frame
  useFrame((state, delta) => {
    if (group.current) {
      // Subtle head movement to make it look alive
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      
      // Mouth animation when speaking
      if (speaking && jawBone.current) {
        // Animate jaw movement when speaking
        jawBone.current.rotation.x = Math.sin(state.clock.elapsedTime * 10) * 0.1;
      } else if (jawBone.current) {
        // Close mouth when not speaking
        jawBone.current.rotation.x = 0;
      }
    }
  });
  
  return (
    <group ref={group}>
      <primitive object={scene} scale={1.8} position={[0, -1.8, 0]} />
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
