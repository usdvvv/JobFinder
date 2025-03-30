
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Group } from 'three';

// 3D Model component
const InterviewerModel = () => {
  const group = useRef<Group>(null);
  
  // Using a default robot/character model from the public folder
  // You can replace this with any other GLTF model
  const { nodes, materials } = useGLTF('/robot.glb');

  // Animation for subtle movement
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  // Fallback to basic head shape if model isn't available
  return (
    <group ref={group} position={[0, -1, 0]} scale={1.5}>
      {/* Fallback geometry if the model doesn't load */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#4F46E5" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[0.35, 0.2, 0.7]} scale={0.15}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh castShadow position={[-0.35, 0.2, 0.7]} scale={0.15}>
        <sphereGeometry args={[1, 16, 16]} />
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
        backgroundColor: '#111',
      }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} castShadow />
        <InterviewerModel />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
      
      {/* Speech indicator */}
      {speaking && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
            Speaking...
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewerAvatar;
