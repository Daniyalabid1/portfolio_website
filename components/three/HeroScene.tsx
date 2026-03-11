"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.05 + mouse.y * 0.1;
    meshRef.current.rotation.y = t * 0.08 + mouse.x * 0.1;

    // Vertex morph
    const geo = meshRef.current.geometry as THREE.IcosahedronGeometry;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const len = Math.sqrt(x*x + y*y + z*z);
      const d = 0.06 * Math.sin(x*3 + t*0.9) * Math.cos(y*3 + t*0.7) * Math.sin(z*2 + t*0.5);
      const f = (len + d) / len;
      pos.setXYZ(i, x*f, y*f, z*f);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} scale={2.4}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial
        color="#0a0a0a"
        emissive="#1a1a1a"
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

function WireOuter() {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.05 + mouse.y * 0.1;
    ref.current.rotation.y = t * 0.08 + mouse.x * 0.1;
  });
  return (
    <mesh ref={ref} scale={2.45}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial color="#444444" wireframe transparent opacity={0.25} />
    </mesh>
  );
}

function OuterRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = t * speed;
    ref.current.rotation.x = tilt;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.004, 8, 200]} />
      <meshBasicMaterial color="#333333" transparent opacity={0.5} />
    </mesh>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 60;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 2.8 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);
  }
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#888888" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0,0,7], fov:44 }} gl={{ antialias:true, alpha:true }} style={{ background:"transparent" }} dpr={[1,1.5]}>
      <ambientLight intensity={0.05} />
      <pointLight position={[6,6,6]}  intensity={3} color="#ffffff" />
      <pointLight position={[-5,-4,4]} intensity={0.8} color="#888888" />
      <pointLight position={[0,0,-6]}  intensity={0.3} color="#333333" />

      <CoreSphere />
      <WireOuter />
      <OuterRing radius={3.1} speed={0.18} tilt={0.4} />
      <OuterRing radius={3.6} speed={-0.12} tilt={-0.7} />
      <OuterRing radius={4.1} speed={0.08} tilt={1.1} />
      <FloatingParticles />
    </Canvas>
  );
}
