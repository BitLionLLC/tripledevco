'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function TriangularPrism({ color = '#5eead4', roughness = 0.2, metalness = 0.6 }) {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const side = 1;
    const height = (Math.sqrt(3) / 2) * side;

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(side, 0);
    shape.lineTo(side / 2, height);
    shape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: 1.4,
      bevelEnabled: false,
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.25;
      meshRef.current.rotation.y = t * 0.35;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={[2.6, 2.6, 2.6]} position={[0, 0.2, 0]}>
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} envMapIntensity={1.2} />
    </mesh>
  );
}

function SceneInner() {
  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 6, 4]} intensity={1.2} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} />
      <TriangularPrism />
      <Stars radius={60} depth={50} count={1600} factor={4} saturation={0} fade speed={0.6} />
    </group>
  );
}

export default function BackgroundScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={[0, 0, 0]} />
        <fog attach="fog" args={[new THREE.Color('#030712'), 10, 40]} />
        <SceneInner />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_0%,rgba(59,130,246,0.10),rgba(16,185,129,0)_40%),radial-gradient(100%_100%_at_80%_20%,rgba(16,185,129,0.10),rgba(59,130,246,0)_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
    </div>
  );
}


