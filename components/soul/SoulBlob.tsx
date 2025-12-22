"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// This is the actual 3D Soul Object
function Soul({ shape, color }: { shape: "ant" | "human" | "elephant" | "pure"; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Logic to change size/wobble based on the "body" it enters
  // Ant = Small, fast wobble. Elephant = Huge, slow wobble.
  const config = {
    ant: { scale: 0.8, distort: 0.6, speed: 4 },
    human: { scale: 1.5, distort: 0.4, speed: 2 },
    elephant: { scale: 2.5, distort: 0.3, speed: 1.5 },
    pure: { scale: 1.2, distort: 0.5, speed: 2 } // Natural state
  };

  const current = config[shape];

  useFrame((state) => {
    if (meshRef.current) {
        // Gentle rotation
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        
        // Smoothly interpolate scale (Growth/Shrink effect)
        meshRef.current.scale.lerp(new THREE.Vector3(current.scale, current.scale, current.scale), 0.05);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={current.distort} // How "wobbly" it is
        speed={current.speed}     // How fast it wobbles
        roughness={0.2}
        metalness={0.8}
        emissive={color}          // Makes it glow
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

export default function SoulScene() {
  const [bodyType, setBodyType] = useState<"pure" | "ant" | "human" | "elephant">("pure");

  return (
    <div className="w-full h-screen bg-zinc-950 relative overflow-hidden flex flex-col items-center">
      
      {/* 3D CANVAS */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />
          
          {/* Background Stars representing Universe */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* The Soul */}
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Soul shape={bodyType} color="#ffffff" />
          </Float>
        </Canvas>
      </div>

      {/* UI CONTROLS */}
      <div className="z-10 mt-24 text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-2 tracking-tighter">The Formless Soul (Jiva)</h1>
        <p className="text-zinc-400 max-w-lg mx-auto text-sm mb-8">
            The soul is formless like water. It has no shape of its own, but expands and contracts 
            to fill the body it inhabits <i>(Deh Parimana)</i>.
        </p>

        {/* Buttons to "Incarnate" */}
        <div className="flex flex-wrap justify-center gap-4">
            <button 
                onClick={() => setBodyType("ant")}
                className={`px-6 py-3 rounded-full border transition-all ${bodyType === "ant" ? "bg-white text-black border-white" : "border-white/20 hover:bg-white/10"}`}
            >
                Ant (Small)
            </button>
            <button 
                onClick={() => setBodyType("human")}
                className={`px-6 py-3 rounded-full border transition-all ${bodyType === "human" ? "bg-white text-black border-white" : "border-white/20 hover:bg-white/10"}`}
            >
                Human (Medium)
            </button>
            <button 
                onClick={() => setBodyType("elephant")}
                className={`px-6 py-3 rounded-full border transition-all ${bodyType === "elephant" ? "bg-white text-black border-white" : "border-white/20 hover:bg-white/10"}`}
            >
                Elephant (Large)
            </button>
             <button 
                onClick={() => setBodyType("pure")}
                className={`px-6 py-3 rounded-full border border-orange-500 text-orange-500 transition-all ${bodyType === "pure" ? "bg-orange-500 text-white" : "hover:bg-orange-500/10"}`}
            >
                Pure State
            </button>
        </div>
      </div>
    </div>
  );
}