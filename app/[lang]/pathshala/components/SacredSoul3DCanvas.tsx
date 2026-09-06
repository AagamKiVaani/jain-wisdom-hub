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

  // References accessed inside continuous animation loop
  const stateRef = useRef<"pure" | "anger" | "forgiveness">("pure");
  const karmicProgressRef = useRef<number>(0.0); // 0.0 = pure, 1.0 = heavy anger, 0.22 = forgiveness residual
  const targetKarmicProgressRef = useRef<number>(0.0);

  const targetColorRef = useRef<THREE.Color>(new THREE.Color(0xffffff));
  const targetEmissiveRef = useRef<THREE.Color>(new THREE.Color(0xffffff));
  const targetEmissiveIntensityRef = useRef<number>(0.95);
  const targetShackleScaleRef = useRef<number>(1.0);

  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const a = new Audio("/sounds/resources/click2.mp3");
      a.volume = 0.5;
      a.play().catch(() => {});
    } catch (e) {}
  };

  const handleStateChange = (newState: "pure" | "anger" | "forgiveness") => {
    playClick();
    const prevState = stateRef.current;
    setActiveState(newState);
    stateRef.current = newState;

    if (newState === "anger") {
      // 1. ANGER: Karma particles slowly fly in and attach to soul, shackles tightly clamp, soul turns dark
      // Reset accumulation if coming from pure or if clicked again, so user sees the accumulation every time!
      if (prevState === "pure" || prevState === "anger") {
        karmicProgressRef.current = 0.0;
      }
      targetKarmicProgressRef.current = 1.0;
      targetShackleScaleRef.current = 1.0; // Tightly bound to soul surface
      targetColorRef.current.setHex(0x1a2333); // Grey-bluish dark soul
      targetEmissiveRef.current.setHex(0x2d1b4e); // Deep dusky violet glow for clear silhouette against cosmos
      targetEmissiveIntensityRef.current = 0.35;
    } else if (newState === "forgiveness") {
      // 2. FORGIVENESS: Karma particles fly away leaving ~7-8 residual, shackles loosen to distance, soul turns reddish-yellowish white
      targetKarmicProgressRef.current = 0.20; // ~7-8 particles remain stuck on soul
      targetShackleScaleRef.current = 1.42; // Loosened, stays hovering at this distance
      targetColorRef.current.setHex(0xffd5ad); // Distinct warm reddish-yellowish white (dawn peach)
      targetEmissiveRef.current.setHex(0xea580c); // Warm amber-reddish inner glow
      targetEmissiveIntensityRef.current = 0.65;
    } else {
      // 3. PURE ATMAN: 100% pure brilliant white, ZERO shackles, ZERO particles, NO wireframes
      targetKarmicProgressRef.current = 0.0;
      karmicProgressRef.current = 0.0;
      targetShackleScaleRef.current = 1.0;
      targetColorRef.current.setHex(0xffffff); // 100% pure brilliant white
      targetEmissiveRef.current.setHex(0xffffff);
      targetEmissiveIntensityRef.current = 1.0;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040407, 0.05);

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "default",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    container.appendChild(renderer.domElement);

    // 2. LIGHTING SETUP
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

    // 3. LIVING FORMLESS AMOEBA SOUL (NO WIREFRAME GLOBES)
    const soulGroup = new THREE.Group();
    scene.add(soulGroup);

    const baseGeo = new THREE.SphereGeometry(1.6, 32, 24);
    const origPositions = baseGeo.attributes.position.clone();

    const soulMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1.0,
      metalness: 0.05,
      roughness: 0.2,
      transparent: true,
      opacity: 0.96,
    });
    const soulMesh = new THREE.Mesh(baseGeo, soulMat);
    soulGroup.add(soulMesh);

    // 4. THE 8 KARMIC SHACKLES (ASHTA KARMA)
    const shackleGroup = new THREE.Group();
    scene.add(shackleGroup);
    shackleGroup.visible = false; // Pure atman has NO shackles!

    const shackleMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      emissive: 0x1e293b,
      metalness: 0.85,
      roughness: 0.3,
    });

    const shackleConfigs = [
      { rx: 0.2, ry: 0.0, rz: 0.3, radius: 1.95 },
      { rx: 0.8, ry: 0.4, rz: 0.1, radius: 2.0 },
      { rx: 1.4, ry: 0.9, rz: 0.6, radius: 2.05 },
      { rx: 2.0, ry: 1.3, rz: 1.1, radius: 1.95 },
      { rx: -0.5, ry: 1.8, rz: 0.4, radius: 2.05 },
      { rx: -1.1, ry: 2.2, rz: 0.8, radius: 2.0 },
      { rx: -1.7, ry: 2.7, rz: 1.3, radius: 2.05 },
      { rx: 2.6, ry: 3.1, rz: 1.7, radius: 1.98 },
    ];

    shackleConfigs.forEach((cfg) => {
      const sGeo = new THREE.TorusGeometry(cfg.radius, 0.038, 8, 36);
      const mesh = new THREE.Mesh(sGeo, shackleMat);
      mesh.rotation.set(cfg.rx, cfg.ry, cfg.rz);
      shackleGroup.add(mesh);
    });

    // 5. KARMA PARTICLES: VISIBLY ATTACHING IN ANGER & VISIBLY LEAVING IN FORGIVE
    // Each particle moves along its own radial ray straight between outer space (radius 4.0) and soul surface (radius 1.62).
    // They are added directly to soulGroup so they NEVER orbit/revolve in space!
    const karmaCount = 40;
    const karmaMeshes: {
      mesh: THREE.Mesh;
      surfacePos: THREE.Vector3;
      outerPos: THREE.Vector3;
      activationThreshold: number;
    }[] = [];

    const karmaGeo = new THREE.DodecahedronGeometry(0.13, 0);
    const karmaMat = new THREE.MeshStandardMaterial({
      color: 0x222a38,
      emissive: 0x581c87, // faint dark violet ember
      metalness: 0.65,
      roughness: 0.55,
      transparent: true,
      opacity: 0.95,
    });

    for (let i = 0; i < karmaCount; i++) {
      const mesh = new THREE.Mesh(karmaGeo, karmaMat.clone());
      const phi = Math.acos(-1 + (2 * i) / karmaCount);
      const theta = Math.sqrt(karmaCount * Math.PI) * phi;

      // Surface position on the soul
      const surfacePos = new THREE.Vector3(
        1.62 * Math.cos(theta) * Math.sin(phi),
        1.62 * Math.sin(theta) * Math.sin(phi),
        1.62 * Math.cos(phi)
      );

      // Radial outer origin straight outward along normal
      const outerPos = surfacePos.clone().normalize().multiplyScalar(4.0 + (i % 3) * 0.4);

      mesh.position.copy(outerPos);
      mesh.visible = false;
      soulGroup.add(mesh);

      // Distributed thresholds: first particle activates at 0.06, last at 0.94
      const activationThreshold = 0.06 + (i / karmaCount) * 0.88;

      karmaMeshes.push({
        mesh,
        surfacePos,
        outerPos,
        activationThreshold,
      });
    }

    // 6. BACKGROUND CELESTIAL STARDUST (120 PARTICLES)
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
      opacity: 0.65,
    });
    const starField = new THREE.Points(starGeo, starMaterial);
    scene.add(starField);

    // 7. TOUCH / MOUSE INTERACTION
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

    // 8. CONTINUOUS ANIMATION LOOP
    let clock = new THREE.Clock();
    let animId: number;
    let lastUiUpdate = 0;

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

      // FORMLESS AMOEBA VERTEX DISPLACEMENT
      const posAttr = baseGeo.attributes.position;
      const orig = origPositions;
      const time = elapsed * 1.6;

      for (let i = 0; i < posAttr.count; i++) {
        const ox = orig.getX(i);
        const oy = orig.getY(i);
        const oz = orig.getZ(i);

        const wave =
          Math.sin(ox * 2.2 + time) * 0.12 +
          Math.cos(oy * 2.5 + time * 1.1) * 0.12 +
          Math.sin(oz * 2.0 + time * 0.8) * 0.1;

        const factor = 1.0 + wave;
        posAttr.setXYZ(i, ox * factor, oy * factor, oz * factor);
      }
      posAttr.needsUpdate = true;
      baseGeo.computeVertexNormals();

      // CONTINUOUS ACCUMULATION / RELEASE RATE
      const currentProg = karmicProgressRef.current;
      const targetProg = targetKarmicProgressRef.current;

      if (currentProg < targetProg) {
        // Slowly accumulating karma dust continuously (takes ~4 seconds)
        karmicProgressRef.current = Math.min(targetProg, currentProg + 0.0042);
      } else if (currentProg > targetProg) {
        // Slowly releasing karma dust (takes ~3.5 seconds)
        karmicProgressRef.current = Math.max(targetProg, currentProg - 0.0052);
      }

      const activeProg = karmicProgressRef.current;
      const currentState = stateRef.current;

      // Shackles visibility and distance logic
      if (currentState === "pure") {
        shackleGroup.visible = false;
      } else {
        shackleGroup.visible = true;

        // Lerp shackle scale (1.0 = tightly bound, 1.42 = loosened hovering at a distance)
        const currentScale = shackleGroup.scale.x;
        const targetScale = targetShackleScaleRef.current;
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.04);
        shackleGroup.scale.set(newScale, newScale, newScale);
      }

      // DYNAMIC VISUAL ATTACHMENT & RELEASE OF KARMA PARTICLES
      karmaMeshes.forEach((k) => {
        if (currentState === "pure") {
          k.mesh.visible = false;
        } else {
          // Window of flight [activationThreshold - 0.12, activationThreshold]
          const flightWindow = 0.12;
          const startFlight = Math.max(0, k.activationThreshold - flightWindow);
          const endFlight = k.activationThreshold;

          if (activeProg < startFlight) {
            // Not yet accumulating / has completely departed into space
            k.mesh.visible = false;
          } else if (activeProg < endFlight) {
            // IN FLIGHT: Visibly flying straight along radial ray
            // In Anger: flying inward to surface. In Forgive: flying outward into space!
            k.mesh.visible = true;
            const t = Math.max(0, Math.min(1, (activeProg - startFlight) / (endFlight - startFlight)));
            k.mesh.position.lerpVectors(k.outerPos, k.surfacePos, t);
            k.mesh.scale.setScalar(0.25 + t * 0.75);
            (k.mesh.material as THREE.MeshStandardMaterial).opacity = 0.25 + t * 0.7;
          } else {
            // FIRMLY ATTACHED: Clamped directly on the soul surface
            k.mesh.visible = true;
            k.mesh.position.copy(k.surfacePos);
            k.mesh.scale.setScalar(1.0);
            (k.mesh.material as THREE.MeshStandardMaterial).opacity = 0.95;
          }
        }
      });

      // VISIBLE, SMOOTH COLOR TRANSITIONS (Color changes gradually)
      soulMat.color.lerp(targetColorRef.current, 0.04);
      soulMat.emissive.lerp(targetEmissiveRef.current, 0.04);
      soulMat.emissiveIntensity = THREE.MathUtils.lerp(
        soulMat.emissiveIntensity,
        targetEmissiveIntensityRef.current,
        0.04
      );
      coreLight.color.lerp(targetColorRef.current, 0.04);

      // Periodically sync the purity percentage counter in the UI smoothly
      if (elapsed - lastUiUpdate > 0.15) {
        lastUiUpdate = elapsed;
        let pct = 100;
        if (currentState === "pure") {
          pct = 100;
        } else if (currentState === "anger") {
          pct = Math.max(15, Math.round(100 - activeProg * 85));
        } else if (currentState === "forgiveness") {
          pct = Math.round(100 - activeProg * 75);
        }
        setPurityPercentage(pct);
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

      {/* Top Header */}
      <div className="relative z-10 w-full flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-3 w-3 rounded-full ${
              activeState === "pure"
                ? "bg-white shadow-[0_0_12px_#ffffff]"
                : activeState === "anger"
                ? "bg-blue-400"
                : "bg-amber-400"
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
                ? "text-blue-300"
                : "text-amber-300"
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
        {/* Floating Dynamic Hint Pill */}
        <div className="pointer-events-none absolute bottom-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[11px] font-mono text-gray-300 backdrop-blur-md">
          <RotateCw className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span>
            {activeState === "pure" && "Touch or drag to orbit the Pure White Formless Soul"}
            {activeState === "anger" && "8 Shackles tightly bound • Karma dust steadily flying in and attaching"}
            {activeState === "forgiveness" && "Loosened shackles at distance • Warm tone • Residual karma on surface"}
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
                ? "bg-slate-900/80 border-2 border-blue-400 text-blue-200 shadow-xl shadow-blue-900/30 scale-[0.98]"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-blue-500/30"
            }`}
          >
            <Lock className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="truncate">Anger (Kashayas)</span>
          </button>

          {/* 2. Forgiveness (Kshama) Button */}
          <button
            onClick={() => handleStateChange("forgiveness")}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeState === "forgiveness"
                ? "bg-amber-950/60 border-2 border-amber-400 text-amber-200 shadow-xl shadow-amber-900/30 scale-[0.98]"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-amber-500/30"
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
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
            "🕊️ Pure Atman: 100% luminous white, formless, unhindered consciousness. Completely free of shackles and karma dust."}
          {activeState === "anger" &&
            "⛓️ Kashaya Binding: 8 Ashta Karma shackles clamp tightly onto the soul as karma dust steadily accumulates on the surface."}
          {activeState === "forgiveness" &&
            "🌅 Kshama Loosening: Shackles loosen to a distance, karma particles depart leaving minimal residue, soul shines warm reddish-yellowish white."}
        </div>
      </div>
    </div>
  );
}
