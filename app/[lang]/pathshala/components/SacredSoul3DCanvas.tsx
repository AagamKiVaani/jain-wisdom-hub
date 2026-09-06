"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Flame, HeartHandshake, RotateCw, Lock, Unlock } from "lucide-react";

export default function SacredSoul3DCanvas({
  soundEnabled = true,
}: {
  soundEnabled?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeState, setActiveState] = useState<"pure" | "anger" | "forgiveness">("pure");
  const [purityPercentage, setPurityPercentage] = useState(100);

  const stateRef = useRef<"pure" | "anger" | "forgiveness">("pure");
  const targetColorRef = useRef<THREE.Color>(new THREE.Color(0xffffff));
  const targetEmissiveRef = useRef<THREE.Color>(new THREE.Color(0xffffff));

  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const a = new Audio("/sounds/resources/click2.mp3");
      a.volume = 0.5;
      a.play().catch(() => {});
    } catch (e) {}
  };

  const handleStateChange = (state: "pure" | "anger" | "forgiveness") => {
    playClick();
    setActiveState(state);
    stateRef.current = state;

    if (state === "anger") {
      setPurityPercentage(20);
      targetColorRef.current.setHex(0x1a1a24); // Dark smoky charcoal
      targetEmissiveRef.current.setHex(0x311042); // Deep dusk violet glow for visibility
    } else if (state === "forgiveness") {
      setPurityPercentage(90);
      targetColorRef.current.setHex(0xd1fae5); // Emerald hint transition
      targetEmissiveRef.current.setHex(0x10b981);
      setTimeout(() => {
        targetColorRef.current.setHex(0xffffff); // Return to 100% white
        targetEmissiveRef.current.setHex(0xffffff);
      }, 1000);
    } else {
      setPurityPercentage(100);
      targetColorRef.current.setHex(0xffffff); // 100% Pure White
      targetEmissiveRef.current.setHex(0xffffff);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & OPTIMIZED RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040407, 0.05);

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Performance optimization
      alpha: true,
      powerPreference: "default",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25)); // Clamped for smooth FPS
    container.appendChild(renderer.domElement);

    // 2. LIGHTS SETUP
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xffffff, 5, 20);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const rimLight = new THREE.DirectionalLight(0xa78bfa, 1.8);
    rimLight.position.set(-5, 6, -4);
    scene.add(rimLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.2);
    frontLight.position.set(4, 5, 6);
    scene.add(frontLight);

    // 3. LIVING FORMLESS AMOEBA SOUL (AROOPI CHETANA)
    const soulGroup = new THREE.Group();
    scene.add(soulGroup);

    // 32x24 segments for ultra-fast, lag-free morphing
    const baseGeo = new THREE.SphereGeometry(1.6, 32, 24);
    const origPositions = baseGeo.attributes.position.clone();

    const soulMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.8,
      metalness: 0.1,
      roughness: 0.25,
      transparent: true,
      opacity: 0.95,
      wireframe: false,
    });
    const soulMesh = new THREE.Mesh(baseGeo, soulMat);
    soulGroup.add(soulMesh);

    // Ethereal subtle halo aura
    const haloGeo = new THREE.SphereGeometry(1.78, 24, 18);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    soulGroup.add(haloMesh);

    // 4. THE 8 KARMIC SHACKLES (ASHTA KARMA)
    // In pure state: completely invisible.
    // In bound state: 8 distinct dark metallic binding toruses clasp around the soul.
    const shackleGroup = new THREE.Group();
    scene.add(shackleGroup);
    shackleGroup.visible = false; // Initially pure!

    const shackleMat = new THREE.MeshStandardMaterial({
      color: 0x4b5563,
      emissive: 0x1f2937,
      metalness: 0.85,
      roughness: 0.35,
    });

    const shackleMeshes: THREE.Mesh[] = [];
    const shackleAngles = [
      { rx: 0.2, ry: 0.0, rz: 0.3, radius: 2.1 },
      { rx: 0.8, ry: 0.4, rz: 0.1, radius: 2.15 },
      { rx: 1.4, ry: 0.9, rz: 0.6, radius: 2.2 },
      { rx: 2.0, ry: 1.3, rz: 1.1, radius: 2.1 },
      { rx: -0.5, ry: 1.8, rz: 0.4, radius: 2.25 },
      { rx: -1.1, ry: 2.2, rz: 0.8, radius: 2.15 },
      { rx: -1.7, ry: 2.7, rz: 1.3, radius: 2.2 },
      { rx: 2.6, ry: 3.1, rz: 1.7, radius: 2.1 },
    ];

    shackleAngles.forEach((cfg) => {
      const sGeo = new THREE.TorusGeometry(cfg.radius, 0.035, 8, 36);
      const mesh = new THREE.Mesh(sGeo, shackleMat);
      mesh.rotation.set(cfg.rx, cfg.ry, cfg.rz);
      shackleGroup.add(mesh);
      shackleMeshes.push(mesh);
    });

    // 5. STICKY KARMA PARTICLES (VARGANAS)
    const karmaCount = 45;
    const karmaGroup = new THREE.Group();
    scene.add(karmaGroup);
    karmaGroup.visible = false;

    const karmaMeshes: {
      mesh: THREE.Mesh;
      surfacePos: THREE.Vector3;
      explodeVel: THREE.Vector3;
    }[] = [];

    const karmaGeo = new THREE.DodecahedronGeometry(0.12, 0);
    const karmaMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      emissive: 0x7f1d1d, // subtle crimson ember
      metalness: 0.7,
      roughness: 0.5,
    });

    for (let i = 0; i < karmaCount; i++) {
      const mesh = new THREE.Mesh(karmaGeo, karmaMat.clone());
      const phi = Math.acos(-1 + (2 * i) / karmaCount);
      const theta = Math.sqrt(karmaCount * Math.PI) * phi;

      // Position anchored directly on the surface of the soul
      const surfacePos = new THREE.Vector3(
        1.62 * Math.cos(theta) * Math.sin(phi),
        1.62 * Math.sin(theta) * Math.sin(phi),
        1.62 * Math.cos(phi)
      );

      mesh.position.copy(surfacePos);
      karmaGroup.add(mesh);
      karmaMeshes.push({
        mesh,
        surfacePos,
        explodeVel: surfacePos.clone().normalize().multiplyScalar(0.08 + Math.random() * 0.06),
      });
    }

    // 6. LEAN CELESTIAL STARDUST (120 PARTICLES FOR 60FPS SMOOTHNESS)
    const starCount = 120;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 3.5 + Math.random() * 6;
      const th = Math.random() * Math.PI * 2;
      const ph = (Math.random() - 0.5) * Math.PI;

      starPos[i * 3] = r * Math.cos(th) * Math.cos(ph);
      starPos[i * 3 + 1] = r * Math.sin(ph);
      starPos[i * 3 + 2] = r * Math.sin(th) * Math.cos(ph);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });
    const starField = new THREE.Points(starGeo, starMaterial);
    scene.add(starField);

    // 7. TOUCH / MOUSE INTERACTIVE ORBIT
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
        targetRotY += deltaX * 0.007;
        targetRotX += deltaY * 0.007;
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

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 8. BUTTER-SMOOTH ANIMATION LOOP
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera damping
      if (!isDragging) {
        targetRotY += (mouseX * 0.35 - targetRotY) * 0.05;
        targetRotX += (-mouseY * 0.35 - targetRotX) * 0.05;
      }

      soulGroup.rotation.y += 0.006 + targetRotY * 0.04;
      soulGroup.rotation.x += 0.003 + targetRotX * 0.04;
      shackleGroup.rotation.y += 0.004;
      shackleGroup.rotation.z += 0.002;
      karmaGroup.rotation.y = soulGroup.rotation.y;
      karmaGroup.rotation.x = soulGroup.rotation.x;

      // FORMLESS AMOEBA VERTEX MORPHING
      const posAttr = baseGeo.attributes.position;
      const orig = origPositions;
      const time = elapsed * 1.6;

      for (let i = 0; i < posAttr.count; i++) {
        const ox = orig.getX(i);
        const oy = orig.getY(i);
        const oz = orig.getZ(i);

        // Multi-frequency harmonic wave for fluid formless amoeba movement
        const wave =
          Math.sin(ox * 2.2 + time) * 0.12 +
          Math.cos(oy * 2.5 + time * 1.1) * 0.12 +
          Math.sin(oz * 2.0 + time * 0.8) * 0.1;

        const factor = 1.0 + wave;
        posAttr.setXYZ(i, ox * factor, oy * factor, oz * factor);
      }
      posAttr.needsUpdate = true;
      baseGeo.computeVertexNormals();

      // Smooth color transitions
      soulMat.color.lerp(targetColorRef.current, 0.06);
      soulMat.emissive.lerp(targetEmissiveRef.current, 0.06);
      coreLight.color.lerp(targetColorRef.current, 0.06);

      const currentState = stateRef.current;

      if (currentState === "pure") {
        // PURE ATMAN: 100% White, ZERO Shackles, ZERO Karma particles
        shackleGroup.visible = false;
        karmaGroup.visible = false;
        haloMesh.visible = true;
        haloMat.opacity = 0.25;
      } else if (currentState === "anger") {
        // ANGER / KASHAYAS: Dark Soul, 8 Shackles Bound, Sticky Karma Clamped
        shackleGroup.visible = true;
        karmaGroup.visible = true;
        haloMesh.visible = false;

        // Stick karma particles right on the undulating surface
        karmaMeshes.forEach((k) => {
          k.mesh.position.lerp(k.surfacePos, 0.08);
          k.mesh.scale.set(1, 1, 1);
        });
      } else if (currentState === "forgiveness") {
        // FORGIVENESS: Shackles shatter and karma particles fly away
        shackleGroup.visible = true;
        shackleGroup.scale.multiplyScalar(1.006); // Shackles breaking open
        karmaGroup.visible = true;

        karmaMeshes.forEach((k) => {
          k.mesh.position.add(k.explodeVel);
          k.mesh.scale.multiplyScalar(0.96); // Disintegrating
        });
      }

      renderer.render(scene, camera);
    };

    animate();

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
      baseGeo.dispose();
      soulMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[440px] md:min-h-[520px] flex flex-col items-center justify-between rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-[#040407] p-6 backdrop-blur-2xl shadow-2xl overflow-hidden group">
      {/* Background ambient radial glow */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />

      {/* Top Header: Pure Wisdom Philosophy (NO TECH JARGON) */}
      <div className="relative z-10 w-full flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-3 w-3 rounded-full ${
              activeState === "pure"
                ? "bg-white shadow-[0_0_12px_#ffffff]"
                : activeState === "anger"
                ? "bg-purple-400"
                : "bg-emerald-400"
            } animate-pulse`}
          />
          <span className="text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
            Consciousness Lab (The Soul & Karma)
          </span>
        </div>

        <div className="flex items-center gap-2 bg-black/60 border border-white/15 px-3 py-1 rounded-full text-xs font-mono text-gray-200">
          <span>Soul Radiance:</span>
          <span
            className={`font-extrabold ${
              activeState === "pure"
                ? "text-white"
                : activeState === "anger"
                ? "text-purple-300"
                : "text-emerald-300"
            }`}
          >
            {purityPercentage}% {activeState === "pure" ? "(Mukta Atman)" : "(Samsari Atman)"}
          </span>
        </div>
      </div>

      {/* Center 3D Interactive Viewport */}
      <div
        ref={containerRef}
        className="relative z-10 w-full flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        title="Touch or drag to orbit in 3D"
      >
        {/* Floating Hint Pill */}
        <div className="pointer-events-none absolute bottom-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[11px] font-mono text-gray-300 backdrop-blur-md">
          <RotateCw className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span>
            {activeState === "pure"
              ? "Touch or drag to orbit the Formless Pure Soul"
              : "Showing 8 Karmic Shackles (Ashta Karma) & Clustered Dust"}
          </span>
        </div>
      </div>

      {/* Bottom Interactive Triggers */}
      <div className="relative z-10 w-full pt-3 border-t border-white/10">
        <div className="grid grid-cols-3 gap-2.5">
          {/* 1. Anger (Kashayas) Button */}
          <button
            onClick={() => handleStateChange("anger")}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeState === "anger"
                ? "bg-purple-950/60 border-2 border-purple-500 text-purple-200 shadow-xl shadow-purple-900/30 scale-[0.98]"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-purple-500/30"
            }`}
          >
            <Lock className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="truncate">Anger (Kashayas)</span>
          </button>

          {/* 2. Forgiveness (Kshama) Button */}
          <button
            onClick={() => handleStateChange("forgiveness")}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeState === "forgiveness"
                ? "bg-emerald-950/60 border-2 border-emerald-500 text-emerald-200 shadow-xl shadow-emerald-900/30 scale-[0.98]"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-emerald-500/30"
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Forgive (Kshama)</span>
          </button>

          {/* 3. Pure Atman Button (100% White, No Shackles) */}
          <button
            onClick={() => handleStateChange("pure")}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeState === "pure"
                ? "bg-white/20 border-2 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-[0.98]"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/40"
            }`}
          >
            <Sparkles className="w-4 h-4 text-white shrink-0" />
            <span className="truncate">Pure Atman</span>
          </button>
        </div>

        {/* Informative Explanation Footnote */}
        <div className="mt-2.5 text-center text-[11px] font-mono text-gray-300">
          {activeState === "pure" &&
            "🕊️ Pure Atman: 100% luminous, formless, self-illumined consciousness. Completely free from all 8 karmic shackles."}
          {activeState === "anger" &&
            "⛓️ Kashaya Binding: Anger obscures the soul's light, binding it in 8 Karmic Shackles (Ashta Karma) with heavy karma dust."}
          {activeState === "forgiveness" &&
            "✨ Nirjara Cleansing: Supreme forgiveness dissolves the 8 shackles, casting off karmic dust to reveal pure luminosity."}
        </div>
      </div>
    </div>
  );
}
