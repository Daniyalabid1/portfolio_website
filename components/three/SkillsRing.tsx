"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ring({ radius, tube, speed, tiltX, tiltZ, color, opacity }: {
  radius: number; tube: number; speed: number;
  tiltX: number; tiltZ: number; color: string; opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * speed;
    ref.current.rotation.x = tiltX;
    ref.current.rotation.z = tiltZ;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function Nucleus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.4;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.22, 1]} />
      <meshStandardMaterial color="#dddddd" metalness={0.9} roughness={0.1} emissive="#aaaaaa" emissiveIntensity={0.3} />
    </mesh>
  );
}

export default function SkillsRing() {
  return (
    <Canvas camera={{ position:[0,0,5], fov:45 }} gl={{ antialias:true, alpha:true }} style={{ background:"transparent" }} dpr={[1,1.5]}>
      <ambientLight intensity={0.05} />
      <pointLight position={[3,3,3]} intensity={2} color="#ffffff" />
      <Ring radius={1}   tube={0.006} speed={0.5}  tiltX={0.5}  tiltZ={0}    color="#555555" opacity={0.7} />
      <Ring radius={1.4} tube={0.005} speed={-0.35} tiltX={1.0}  tiltZ={0.3}  color="#444444" opacity={0.5} />
      <Ring radius={1.8} tube={0.004} speed={0.22}  tiltX={0.3}  tiltZ={-0.6} color="#333333" opacity={0.4} />
      <Ring radius={2.2} tube={0.003} speed={-0.15} tiltX={-0.8} tiltZ={0.8}  color="#2a2a2a" opacity={0.3} />
      <Nucleus />
    </Canvas>
  );
}
