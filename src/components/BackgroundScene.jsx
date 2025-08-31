'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Line } from '@react-three/drei';

function WirePyramid({ lineColor = '#ffffff', lineWidth = 8 }) {
  const groupRef = useRef();
  const targetRef = useRef({ x: 0, y: 0 });

  const { vertices, edges } = useMemo(() => {
    const apex = new THREE.Vector3(0, 1.2, 0);
    const baseY = -0.9;
    const s = 1.4;
    const b0 = new THREE.Vector3(-s, baseY, -s);
    const b1 = new THREE.Vector3(s, baseY, -s);
    const b2 = new THREE.Vector3(s, baseY, s);
    const b3 = new THREE.Vector3(-s, baseY, s);
    const center = new THREE.Vector3(0, (apex.y + baseY) / 2, 0);

    const verts = [apex, b0, b1, b2, b3, center];

    const edgeIdx = [
      // base perimeter
      [1, 2], [2, 3], [3, 4], [4, 1],
      // sides
      [0, 1], [0, 2], [0, 3], [0, 4],
      // escher-like internal connections
      [1, 3], [2, 4], // opposing base diagonals
      [0, 5], // apex to center
      [5, 1], [5, 3], // center to two non-adjacent base points (suggests an impossible overlap)
    ];

    return { vertices: verts, edges: edgeIdx };
  }, []);

  useEffect(() => {
    function handlePointerMove(e) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRef.current.x = x;
      targetRef.current.y = y;
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const { x, y } = targetRef.current;
      const targetX = -y * 0.7 + 0.15;
      const targetY = x * 1.1;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]} scale={[1.6, 1.6, 1.6]}>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[vertices[a], vertices[b]]}
          color={lineColor}
          lineWidth={lineWidth}
          transparent
          opacity={0.95}
        />
      ))}
    </group>
  );
}

function SceneInner() {
  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 6, 4]} intensity={1.2} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} />
      <WirePyramid />
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


