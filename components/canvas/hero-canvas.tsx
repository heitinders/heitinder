"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Orb() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * 0.18;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[1, 48, 48]} scale={1.6}>
      <meshStandardMaterial
        color="#8b5cf6"
        roughness={0.25}
        metalness={0.1}
        emissive="#1d4ed8"
        emissiveIntensity={0.25}
        wireframe
      />
    </Sphere>
  );
}

export function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.35} />
        <pointLight position={[2, 2, 2]} intensity={2} color="#8b5cf6" />
        <pointLight position={[-2, -1, 1]} intensity={1.2} color="#22d3ee" />
        <Orb />
      </Canvas>
    </div>
  );
}
