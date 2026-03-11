"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingPolyhedron() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = t * 0.12;
    group.current.rotation.y = t * 0.18;
    group.current.position.y = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={group}>
      {/* Solid inner */}
      <mesh scale={0.9}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#111111" metalness={0.95} roughness={0.05} emissive="#1a1a1a" emissiveIntensity={0.5} />
      </mesh>
      {/* Wire outer */}
      <mesh scale={1.05}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#555555" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Large wire */}
      <mesh scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#2a2a2a" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function AboutScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position:[0,0,4], fov:45 }} gl={{ antialias:true, alpha:true }} style={{ background:"transparent" }} dpr={[1,1.5]}>
        <ambientLight intensity={0.1} />
        <pointLight position={[3,3,3]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-3,-2,2]} intensity={0.5} color="#888888" />
        <FloatingPolyhedron />
      </Canvas>
    </div>
  );
}
