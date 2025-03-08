
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterProps {
  position?: [number, number, number];
}

const Scientist = ({ position = [0, 0, 0] }: CharacterProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (meshRef.current) {
      // Safe access to rotation and position properties
      if (meshRef.current.rotation) {
        meshRef.current.rotation.y = Math.sin(t / 4) * 0.3;
      }
      if (meshRef.current.position) {
        meshRef.current.position.y = Math.sin(t / 2) * 0.1 + 0.1;
      }
    }
    
    if (headRef.current) {
      // Safe access to scale property
      if (headRef.current.scale) {
        headRef.current.scale.x = 0.5;
        headRef.current.scale.y = 0.5;
        headRef.current.scale.z = 0.5;
      }
      
      // Safe access to rotation property
      if (headRef.current.rotation) {
        headRef.current.rotation.y = Math.sin(t / 3) * 0.2;
        headRef.current.rotation.x = Math.sin(t / 4) * 0.1;
      }
    }
  });

  return (
    <group position={position}>
      {/* Body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 1.2, 16]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#818cf8" />
      </mesh>
      
      {/* Glasses */}
      <mesh position={[0, 0.9, 0.3]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
};

const Physicist = ({ position = [0, 0, 0] }: CharacterProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const armRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (meshRef.current) {
      // Safe access to rotation and position properties
      if (meshRef.current.rotation) {
        meshRef.current.rotation.y = Math.sin(t / 3) * 0.3;
      }
      if (meshRef.current.position) {
        meshRef.current.position.y = Math.sin(t / 2) * 0.1;
      }
    }
    
    if (armRef.current) {
      // Safe access to rotation property
      if (armRef.current.rotation) {
        armRef.current.rotation.z = Math.sin(t) * 0.2;
        armRef.current.rotation.x = Math.sin(t / 2) * 0.1;
      }
    }
  });

  return (
    <group position={position}>
      {/* Body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 1.2, 16]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
      
      {/* Arm */}
      <mesh ref={armRef} position={[0.4, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshStandardMaterial color="#93c5fd" />
      </mesh>
      
      {/* Floating Formula */}
      <mesh position={[0.8, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.1, 0.03, 16, 32]} />
        <meshStandardMaterial color="#dbeafe" emissive="#dbeafe" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const CuriousKid = ({ position = [0, 0, 0] }: CharacterProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (meshRef.current) {
      // Safe access to rotation and position properties
      if (meshRef.current.rotation) {
        meshRef.current.rotation.y = Math.sin(t / 2) * 0.5;
      }
      if (meshRef.current.position) {
        meshRef.current.position.y = Math.sin(t / 1.5) * 0.15 + 0.15;
      }
    }
    
    if (headRef.current) {
      // Safe access to position property
      if (headRef.current.position) {
        headRef.current.position.x = Math.sin(t / 1) * 0.1;
        headRef.current.position.z = Math.cos(t / 1) * 0.1;
      }
    }
  });

  return (
    <group position={position}>
      {/* Body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.4, 0.9, 16]} />
        <meshStandardMaterial color="#db2777" />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#f472b6" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.1, 0.75, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[-0.1, 0.75, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
};

const ThreeCharacters = () => {
  return (
    <div className="w-full h-[400px] relative glass rounded-xl overflow-hidden">
      <div className="canvas-container w-full h-full">
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Scientist />
        <Physicist position={[-2, 0, 0]} />
        <CuriousKid position={[2, 0, 0]} />
      </div>
    </div>
  );
};

export default ThreeCharacters;
