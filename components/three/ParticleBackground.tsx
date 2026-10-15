"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ParticleNet() {
  const count = 80;
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  const velocities = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 0.004;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      arr[i * 3 + 2] = 0;
    }
    return arr;
  }, []);

  const currentPositions = useRef(new Float32Array(positions));

  useFrame(() => {
    const pos = currentPositions.current;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      // Wrap around
      if (pos[i * 3] > 10)  pos[i * 3] = -10;
      if (pos[i * 3] < -10) pos[i * 3] = 10;
      if (pos[i * 3 + 1] > 6)  pos[i * 3 + 1] = -6;
      if (pos[i * 3 + 1] < -6) pos[i * 3 + 1] = 6;
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.set(pos);
      attr.needsUpdate = true;
    }

    // Update connection lines
    if (linesRef.current) {
      const linePositions: number[] = [];
      const threshold = 3.5;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < threshold) {
            linePositions.push(
              pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
              pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
            );
          }
        }
      }
      const lineAttr = linesRef.current.geometry.attributes.position;
      const maxLines = 600;
      const newPos = new Float32Array(maxLines * 6);
      const copyLen = Math.min(linePositions.length, maxLines * 6);
      for (let k = 0; k < copyLen; k++) newPos[k] = linePositions[k];
      (linesRef.current.geometry.attributes.position as THREE.BufferAttribute).set(newPos);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, copyLen / 3);
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={currentPositions.current} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#444444" transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={600 * 2} array={new Float32Array(600 * 6)} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#2a2a2a" transparent opacity={0.5} />
      </lineSegments>
    </>
  );
}

export default function ParticleBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1]}
      >
        <ParticleNet />
      </Canvas>
    </div>
  );
}
