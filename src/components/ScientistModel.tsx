
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { gsap } from 'gsap';

// The actual 3D model component (we'll use a placeholder box since we don't have a real model)
const ScientistFigure = ({ onInteraction, isActive }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Idle animation
      meshRef.current.rotation.y = Math.sin(t / 4) * 0.3;
      meshRef.current.position.y = Math.sin(t / 2) * 0.1;
      
      // Hover animation
      if (hovered) {
        gsap.to(meshRef.current.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.2 });
      } else {
        gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.2 });
      }
      
      // Active animation
      if (isActive) {
        gsap.to(meshRef.current.rotation, { z: Math.PI * 2, duration: 1.5, repeat: -1 });
      } else {
        gsap.killTweensOf(meshRef.current.rotation);
      }
    }
  });
  
  return (
    <group onClick={() => onInteraction('scientist')}>
      {/* Placeholder for scientist model */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color={isActive ? "#4f46e5" : "#3b82f6"} />
      </mesh>
      {/* Lab equipment (beakers, etc) */}
      <mesh position={[1.5, -0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.8, 16]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.7} />
      </mesh>
      <mesh position={[1.2, -0.7, 0.5]}>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

// Physicist figure (placeholder)
const PhysicistFigure = ({ onInteraction, isActive }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Idle animation
      meshRef.current.rotation.y = Math.sin(t / 3) * 0.4;
      meshRef.current.position.y = Math.sin(t / 2.5) * 0.1;
      
      // Active animation
      if (isActive) {
        gsap.to(meshRef.current.rotation, { x: Math.PI * 2, duration: 2, repeat: -1 });
      } else {
        gsap.killTweensOf(meshRef.current.rotation);
      }
    }
  });
  
  return (
    <group onClick={() => onInteraction('physicist')}>
      {/* Placeholder for physicist model */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={isActive ? "#7c3aed" : "#6366f1"} />
      </mesh>
      {/* Atoms orbiting */}
      <group rotation={[0, t => Math.sin(t / 2), 0]}>
        <mesh position={[0, 0, 1.5]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={2} />
        </mesh>
        <mesh position={[1.5, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
};

// Curious kid figure
const CuriousKidFigure = ({ onInteraction, isActive }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Idle animation - more energetic for the kid
      meshRef.current.rotation.y = Math.sin(t / 2) * 0.5;
      meshRef.current.position.y = Math.sin(t * 1.5) * 0.15;
      
      // Active animation
      if (isActive) {
        gsap.to(meshRef.current.position, { y: 1, duration: 0.5, yoyo: true, repeat: -1 });
      } else {
        gsap.killTweensOf(meshRef.current.position);
      }
    }
  });
  
  return (
    <group onClick={() => onInteraction('kid')}>
      {/* Placeholder for kid model */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color={isActive ? "#ec4899" : "#f472b6"} />
      </mesh>
      {/* Toy or discovery object */}
      <mesh position={[1, -0.2, 0.5]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color="#fb7185" />
      </mesh>
    </group>
  );
};

// The main component that combines all three characters
const ThreeCharacters = () => {
  const [activeCharacter, setActiveCharacter] = useState(null);
  
  const handleInteraction = (character) => {
    setActiveCharacter(character);
    // We could use this to trigger specific animations or information displays
  };
  
  return (
    <div className="w-full h-[40vh] md:h-[50vh]">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          config={{ mass: 2, tension: 300 }}
          snap={{ mass: 4, tension: 150 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <group position={[-4, 0, 0]}>
            <ScientistFigure 
              onInteraction={handleInteraction} 
              isActive={activeCharacter === 'scientist'} 
            />
          </group>
          <group position={[0, 0, 0]}>
            <PhysicistFigure 
              onInteraction={handleInteraction} 
              isActive={activeCharacter === 'physicist'} 
            />
          </group>
          <group position={[4, 0, 0]}>
            <CuriousKidFigure 
              onInteraction={handleInteraction} 
              isActive={activeCharacter === 'kid'} 
            />
          </group>
        </PresentationControls>
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1.5} far={5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ThreeCharacters;
