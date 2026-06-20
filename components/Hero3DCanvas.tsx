"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function SpiralScene() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Procedural ribbed normal/bump canvas texture
  const ribbedTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Draw smooth sine-wave-like horizontal gradient for ribs
      const grad = ctx.createLinearGradient(0, 0, 0, 64);
      grad.addColorStop(0, "#000000");   // Recess (lowest height)
      grad.addColorStop(0.5, "#ffffff"); // Ridge peak (highest height)
      grad.addColorStop(1, "#000000");   // Recess
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // Repeat the ribbed texture 160 times along the length of the torus tube
    texture.repeat.set(1, 160);
    return texture;
  }, []);

  // Track cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouse = mouseRef.current;
    
    // Smooth LERP mouse coordinates
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Retrieve current scroll position
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const height = typeof window !== "undefined" ? window.innerHeight : 800;
    const s = scrollY / height; // Normalized scroll page ratio

    // Interpolate positions, scale, and rotations based on scroll stage
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 1.0;
    let targetRotationX = scrollY * 0.0008;
    let targetRotationY = time * 0.08 + scrollY * 0.0012;

    if (s <= 0.8) {
      // Stage 1: Hero (Centered, large)
      targetX = 0;
      targetY = -0.1;
      targetZ = 0;
      targetScale = 1.05;
    } else if (s <= 1.8) {
      // Stage 2: About / Our Mission (Shift to right, zoom in slightly to focus on ribbed texture)
      const t = (s - 0.8) / 1.0; // 0 to 1
      targetX = THREE.MathUtils.lerp(0, 1.3, t);
      targetY = THREE.MathUtils.lerp(-0.1, 0.15, t);
      targetZ = THREE.MathUtils.lerp(0, 0.3, t);
      targetScale = THREE.MathUtils.lerp(1.05, 1.2, t);
    } else if (s <= 2.8) {
      // Stage 3: Capabilities / Tech Grid (Shift to left, scale down slightly)
      const t = (s - 1.8) / 1.0; // 0 to 1
      targetX = THREE.MathUtils.lerp(1.3, -1.2, t);
      targetY = THREE.MathUtils.lerp(0.15, -0.15, t);
      targetZ = THREE.MathUtils.lerp(0.3, -0.4, t);
      targetScale = THREE.MathUtils.lerp(1.2, 0.85, t);
    } else {
      // Stage 4: Footer / Contact (Return to center-bottom, forms a dark portal/vortex)
      const t = Math.min(1.0, (s - 2.8) / 1.0); // 0 to 1
      targetX = THREE.MathUtils.lerp(-1.2, 0, t);
      targetY = THREE.MathUtils.lerp(-0.15, -1.1, t);
      targetZ = THREE.MathUtils.lerp(-0.4, 0.4, t);
      targetScale = THREE.MathUtils.lerp(0.85, 1.3, t);
    }

    if (groupRef.current) {
      // Smoothly LERP position
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.055;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.055;
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.055;

      // Smoothly LERP scale
      const currentScale = groupRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.055;
      groupRef.current.scale.set(newScale, newScale, newScale);

      // Smoothly LERP rotation, adding mouse tilt
      groupRef.current.rotation.x = targetRotationX + mouse.y * 0.15;
      groupRef.current.rotation.y = targetRotationY + mouse.x * 0.25;
      
      // Floating animation
      groupRef.current.position.y += Math.sin(time * 0.5) * 0.0018;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Main Chrome Spiral Helix */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.0, 0.32, 280, 32, 2, 5]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.12}
          metalness={1.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={1.0}
          bumpMap={ribbedTexture || undefined}
          bumpScale={0.06}
          roughnessMap={ribbedTexture || undefined}
          envMapIntensity={1.8}
        />
      </mesh>
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="w-full h-screen fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden bg-[#06040a]">
      {/* Vignette overlays matching Ascend style */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06040a]/20 to-[#06040a] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,#06040a_85%)] z-10 pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 4.0], fof: 55 } as any}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        {/* Lights Setup */}
        <ambientLight intensity={0.2} />
        
        {/* Main studio direction light */}
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -2]} intensity={0.4} color="#78c6f5" />

        {/* Load high contrast Studio environment presets for chrome metal highlights */}
        <Environment preset="studio" />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <SpiralScene />
        </Float>
      </Canvas>
    </div>
  );
}
