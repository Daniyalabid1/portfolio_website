"use client";

import dynamic from "next/dynamic";

const ParticleBackground = dynamic(() => import("./three/ParticleBackground"), {
  ssr: false,
  loading: () => null,
});

export default function ParticleBackgroundWrapper() {
  return <ParticleBackground />;
}
