import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Animated floating orb
const FloatingOrb = ({ position, color, speed = 1, distort = 0.4, scale = 1 }) => {
  const meshRef = useRef();
  const t = useRef(Math.random() * 100);

  useFrame((state, delta) => {
    t.current += delta * speed;
    meshRef.current.position.y = position[1] + Math.sin(t.current * 0.8) * 0.3;
    meshRef.current.position.x = position[0] + Math.sin(t.current * 0.5) * 0.2;
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.z += delta * 0.05;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed * 2}
        roughness={0}
        metalness={0.1}
        transparent
        opacity={0.7}
        envMapIntensity={0.5}
      />
    </Sphere>
  );
};

// Rotating ring
const Ring = ({ radius, color, rotSpeed, tiltX = 0, tiltZ = 0 }) => {
  const meshRef = useRef();
  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * rotSpeed;
  });
  return (
    <mesh ref={meshRef} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.006, 16, 200]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
};

// Particle field  
const Particles = ({ count = 200 }) => {
  const meshRef = useRef();
  const positions = useRef(new Float32Array(count * 3));
  
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#7c3aed"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
};

// Main fluid scene component
const FluidScene = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main center orb */}
      <FloatingOrb position={[0, 0, 0]} color="#4a0e8f" speed={0.5} distort={0.5} scale={1.8} />
      
      {/* Satellite orbs */}
      <FloatingOrb position={[-3.5, 1, -2]} color="#2563eb" speed={0.8} distort={0.3} scale={0.8} />
      <FloatingOrb position={[3, -1, -1]} color="#7c3aed" speed={0.6} distort={0.6} scale={1.1} />
      <FloatingOrb position={[1.5, 2, -3]} color="#f472b6" speed={1.2} distort={0.2} scale={0.5} />
      <FloatingOrb position={[-2, -2, -2]} color="#60a5fa" speed={0.9} distort={0.4} scale={0.7} />

      {/* Orbital rings */}
      <Ring radius={2.5} color="#7c3aed" rotSpeed={0.3} tiltX={Math.PI / 4} />
      <Ring radius={3.2} color="#60a5fa" rotSpeed={-0.2} tiltX={Math.PI / 6} tiltZ={Math.PI / 8} />
      <Ring radius={3.8} color="#f472b6" rotSpeed={0.15} tiltX={Math.PI / 3} tiltZ={-Math.PI / 6} />

      {/* Particle field */}
      <Particles count={300} />
    </group>
  );
};

const FluidSurface3D = ({ style = {} }) => (
  <div style={{ width: '100%', height: '100%', ...style }}>
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#f472b6" />
      <FluidScene />
    </Canvas>
  </div>
);

export default FluidSurface3D;
