"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Flame, HeartHandshake, RotateCw } from "lucide-react";

export default function SacredSoul3DCanvas({
  soundEnabled = true,
}: {
  soundEnabled?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeState, setActiveState] = useState<"pure" | "anger" | "forgiveness">("pure");
  const [purityPercentage, setPurityPercentage] = useState(100);

  // References to communicate with the Three.js render loop without re-instantiating
  const stateRef = useRef<"pure" | "anger" | "forgiveness">("pure");
  const shockwaveRef = useRef<number>(0);
  const targetColorRef = useRef<THREE.Color>(new THREE.Color(0xf59e0b));

  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const a = new Audio("/sounds/resources/click2.mp3");
      a.volume = 0.55;
      a.play().catch(() => {});
    } catch (e) {}
  };

  const handleStateChange = (state: "pure" | "anger" | "forgiveness") => {
    playClick();
    setActiveState(state);
    stateRef.current = state;

    if (state === "anger") {
      setPurityPercentage(35);
      targetColorRef.current.setHex(0xb91c1c); // Dark Crimson Red
    } else if (state === "forgiveness") {
      setPurityPercentage(90);
      shockwaveRef.current = 1.0; // Trigger radiant shockwave
      targetColorRef.current.setHex(0x10b981); // Emerald Green transition
      setTimeout(() => {
        targetColorRef.current.setHex(0xfbbf24); // Return to Gold
      }, 1200);
    } else {
      setPurityPercentage(100);
      shockwaveRef.current = 1.0;
      targetColorRef.current.setHex(0xfbbf24); // Pure Luminous Amber Gold
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.06);

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. LIGHTS SETUP
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xfbbf24, 8, 25);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const goldKeyLight = new THREE.DirectionalLight(0xfffbeb, 2.5);
    goldKeyLight.position.set(5, 8, 5);
    scene.add(goldKeyLight);

    const sapphireRimLight = new THREE.PointLight(0x38bdf8, 4, 20);
    sapphireRimLight.position.set(-6, -4, -4);
    scene.add(sapphireRimLight);

    // 3. CENTRAL 3D SOUL CRYSTAL (THE JĪVA)
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // Main Faceted Icosahedron Gem
    const gemGeometry = new THREE.IcosahedronGeometry(1.6, 0);
    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfde047,
      emissive: 0xd97706,
      emissiveIntensity: 0.35,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.85, // Glass refractive transmission
      thickness: 1.2,
      ior: 1.65,
      reflectivity: 0.9,
      flatShading: true,
    });
    const gemMesh = new THREE.Mesh(gemGeometry, gemMaterial);
    crystalGroup.add(gemMesh);

    // Wireframe Cage for High-Tech Holographic Shimmer
    const wireGeometry = new THREE.IcosahedronGeometry(1.62, 0);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xfffbeb,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    crystalGroup.add(wireMesh);

    // Glowing Inner Plasma Core
    const coreGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });
    const plasmaMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    crystalGroup.add(plasmaMesh);

    // 4. THREE CONCENTRIC ASTROLABE RINGS (THE RATNATRAYA - 3 JEWELS)
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.25,
    });

    // Ring 1: Samyak Darshan (Right Faith)
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.035, 16, 120);
    const ring1 = new THREE.Mesh(ring1Geo, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2: Samyak Jnana (Right Knowledge)
    const ring2Geo = new THREE.TorusGeometry(2.85, 0.035, 16, 120);
    const ring2 = new THREE.Mesh(ring2Geo, ringMaterial);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    // Ring 3: Samyak Charitra (Right Conduct)
    const ring3Geo = new THREE.TorusGeometry(3.35, 0.03, 16, 120);
    const ring3 = new THREE.Mesh(ring3Geo, ringMaterial);
    ring3.rotation.z = Math.PI / 5;
    ringGroup.add(ring3);

    // 5. 3D KARMA PARTICLES (VARGANAS)
    const karmaCount = 60;
    const karmaGroup = new THREE.Group();
    scene.add(karmaGroup);

    const karmaMeshes: { mesh: THREE.Mesh; targetPos: THREE.Vector3; freeVel: THREE.Vector3; attached: boolean }[] = [];
    const karmaGeo = new THREE.DodecahedronGeometry(0.12, 0);
    const karmaMat = new THREE.MeshStandardMaterial({
      color: 0x374151,
      metalness: 0.5,
      roughness: 0.7,
      flatShading: true,
    });

    for (let i = 0; i < karmaCount; i++) {
      const mesh = new THREE.Mesh(karmaGeo, karmaMat.clone());
      const phi = Math.acos(-1 + (2 * i) / karmaCount);
      const theta = Math.sqrt(karmaCount * Math.PI) * phi;

      // Surface target on the crystal
      const targetPos = new THREE.Vector3(
        1.75 * Math.cos(theta) * Math.sin(phi),
        1.75 * Math.sin(theta) * Math.sin(phi),
        1.75 * Math.cos(phi)
      );

      // Initial free floating position far outside
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      );
      mesh.visible = false;

      karmaGroup.add(mesh);
      karmaMeshes.push({
        mesh,
        targetPos,
        freeVel: new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1),
        attached: false,
      });
    }

    // 6. SWIRLING CELESTIAL STARDUST FIELD (500 PARTICLES)
    const starCount = 500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 2.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      starPositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      starPositions[i * 3 + 1] = radius * Math.sin(phi);
      starPositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      // Golden Amber star palette
      starColors[i * 3] = 0.98 + Math.random() * 0.02;
      starColors[i * 3 + 1] = 0.75 + Math.random() * 0.2;
      starColors[i * 3 + 2] = 0.15 + Math.random() * 0.3;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 7. INTERACTIVE MOUSE & TOUCH ORBITING
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // 8. RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 9. ANIMATION LOOP (60-120 FPS WITH DAMPING)
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera perspective damping tracking cursor
      if (!isDragging) {
        targetRotY += (mouseX * 0.45 - targetRotY) * 0.05;
        targetRotX += (-mouseY * 0.45 - targetRotX) * 0.05;
      }

      crystalGroup.rotation.y += 0.008 + targetRotY * 0.05;
      crystalGroup.rotation.x += 0.004 + targetRotX * 0.05;

      // Rotate Astrolabe Rings at independent planetary speeds
      ring1.rotation.z += 0.007;
      ring1.rotation.x += 0.004;
      ring2.rotation.y += 0.009;
      ring2.rotation.z -= 0.005;
      ring3.rotation.x -= 0.006;
      ring3.rotation.y += 0.008;

      // Swirl stardust galaxy
      starField.rotation.y -= 0.002;
      starField.rotation.x = Math.sin(elapsed * 0.2) * 0.1;

      // Pulse Central Plasma Core
      const pulseScale = 1.0 + Math.sin(elapsed * 3.5) * 0.08;
      plasmaMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // Smooth color transitions based on state (Anger vs Purity)
      gemMaterial.color.lerp(targetColorRef.current, 0.06);
      coreLight.color.lerp(targetColorRef.current, 0.06);

      // Karma Particle Physics
      const currentState = stateRef.current;
      karmaMeshes.forEach((k, idx) => {
        if (currentState === "anger") {
          k.mesh.visible = true;
          // Magnetically pull onto the crystal surface
          k.mesh.position.lerp(k.targetPos, 0.06);
          k.mesh.rotation.x += 0.02;
          k.mesh.rotation.y += 0.03;
          (k.mesh.material as THREE.MeshStandardMaterial).color.setHex(idx % 2 === 0 ? 0x991b1b : 0x1f2937);
        } else if (currentState === "forgiveness") {
          // Explode outward away from the center with radial shockwave
          k.mesh.position.addScaledVector(k.targetPos, 0.08);
          (k.mesh.material as THREE.MeshStandardMaterial).opacity -= 0.02;
          if (k.mesh.position.length() > 8) {
            k.mesh.visible = false;
          }
        } else {
          // Pure state: completely clear
          k.mesh.visible = false;
        }
      });

      // Render Scene
      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[440px] md:min-h-[520px] flex flex-col items-center justify-between rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-[#050508] p-6 backdrop-blur-2xl shadow-2xl overflow-hidden group">
      {/* Background ambient radial glow */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl group-hover:bg-amber-500/25 transition-all duration-700" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />

      {/* Top Header Controls */}
      <div className="relative z-10 w-full flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
            3D WebGL Soul Simulator (Jīva & Karma)
          </span>
        </div>

        <div className="flex items-center gap-2 bg-black/60 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-mono text-amber-200">
          <span>Soul Radiance:</span>
          <span className="font-extrabold text-amber-400">{purityPercentage}%</span>
        </div>
      </div>

      {/* Center 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative z-10 w-full flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        title="Drag or move cursor to orbit in 3D"
      >
        {/* Floating 3D Hint Badge */}
        <div className="pointer-events-none absolute bottom-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[11px] font-mono text-gray-300 backdrop-blur-md">
          <RotateCw className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Touch or drag to orbit 3D Soul Gem & Astrolabe Rings</span>
        </div>
      </div>

      {/* Bottom Interactive Karma State Triggers */}
      <div className="relative z-10 w-full pt-3 border-t border-white/10">
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => handleStateChange("anger")}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
              activeState === "anger"
                ? "bg-red-500/30 border-2 border-red-500 text-red-100 shadow-xl shadow-red-500/25 scale-[0.98]"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-red-500/30"
            }`}
          >
            <Flame className="w-4 h-4 text-red-400 shrink-0" />
            <span className="truncate">Add Anger (Krodha)</span>
          </button>

          <button
            onClick={() => handleStateChange("forgiveness")}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
              activeState === "forgiveness"
                ? "bg-emerald-500/30 border-2 border-emerald-500 text-emerald-100 shadow-xl shadow-emerald-500/25 scale-[0.98]"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-emerald-500/30"
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Forgive (Kshama)</span>
          </button>

          <button
            onClick={() => handleStateChange("pure")}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
              activeState === "pure"
                ? "bg-amber-500/35 border-2 border-amber-400 text-amber-100 shadow-xl shadow-amber-500/25 scale-[0.98]"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-amber-400/30"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Pure Atman</span>
          </button>
        </div>

        <div className="mt-2.5 text-center text-[11px] font-mono text-gray-400">
          {activeState === "pure" && "✨ The Pure Soul: Self-illuminating, unblemished consciousness (Siddha state)."}
          {activeState === "anger" && "🌪️ Kashaya Inflow: Anger creates negative magnetic attraction, drawing heavy karma dust onto the soul."}
          {activeState === "forgiveness" && "🕊️ Samvara & Nirjara: Supreme forgiveness breaks karmic bonds, instantly restoring radiance."}
        </div>
      </div>
    </div>
  );
}
