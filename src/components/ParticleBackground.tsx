
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { gsap } from 'gsap';

// Particles component that renders thousands of small dots
const Particles = ({ count = 5000, mouse }) => {
  const mesh = useRef();
  const { viewport, size } = useThree();
  
  // Create a large array of random particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 25;
      const size = Math.random() * 0.5 + 0.1;
      temp.push({ x, y, z, size });
    }
    return temp;
  }, [count]);
  
  // Create the particles geometry
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.x;
      positions[i * 3 + 1] = particle.y;
      positions[i * 3 + 2] = particle.z;
      sizes[i] = particle.size;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geometry;
  }, [particles, count]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Gentle wave motion
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      particlesGeometry.attributes.position.array[i3 + 1] += Math.sin(time * 0.1 + particlesGeometry.attributes.position.array[i3] * 0.1) * 0.002;
    }
    
    particlesGeometry.attributes.position.needsUpdate = true;
    
    // Subtle rotation
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.02;
    }
    
    // Mouse interaction
    if (mouse.current) {
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.current.y * 0.2, 0.1);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.current.x * 0.2, 0.1);
    }
  });

  return (
    <points ref={mesh} geometry={particlesGeometry}>
      <pointsMaterial
        attach="material"
        size={0.08}
        sizeAttenuation={true}
        color="#3b82f6"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main component that creates a fullscreen canvas with particles
const ParticleBackground = () => {
  const canvasRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to -1 to 1
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animate the canvas opacity
    gsap.fromTo(
      canvasRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.out" }
    );
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div ref={canvasRef} className="fixed inset-0 -z-10 overflow-hidden transition-opacity duration-500">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={["#030712"]} />
        <fog attach="fog" args={["#030712", 5, 30]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <Particles mouse={mouseRef} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
