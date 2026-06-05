import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Compass, Lightbulb, Play, RotateCw } from "lucide-react";

export default function Interactive3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainStructureRef = useRef<THREE.Group | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);

  const [activeTheme, setActiveTheme] = useState<"champagne" | "neon" | "monochrome">("champagne");
  const [spinSpeed, setSpinSpeed] = useState<number>(1);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Spotlight color configurations based on active theme
  const themeColors = {
    champagne: {
      ambient: "#1c140c",
      light1: "#b8872b",
      light2: "#eedeb0",
      light3: "#7e5218"
    },
    neon: {
      ambient: "#091218",
      light1: "#00f0ff",
      light2: "#ff007f",
      light3: "#9d00ff"
    },
    monochrome: {
      ambient: "#121212",
      light1: "#ffffff",
      light2: "#888888",
      light3: "#222222"
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // 1. Initialize Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent backdrop of container
    sceneRef.current = scene;

    // 2. Initialize Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 10);
    cameraRef.current = camera;

    // 3. Initialize Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    rendererRef.current = renderer;

    // 4. Create Main 3D Atrium Architectural Structure (Grouped mesh representation)
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainStructureRef.current = mainGroup;

    // Dome frame rings
    const ringCount = 5;
    const ringMaterials: THREE.MeshPhysicalMaterial[] = [];

    for (let i = 0; i < ringCount; i++) {
      const radius = 2.5 - (i * 0.35);
      const ringGeometry = new THREE.TorusGeometry(radius, 0.05, 12, 64);
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(themeColors[activeTheme].light1),
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.6 + i * 0.1,
        transmission: i === 0 ? 0 : 0.8,
        thickness: 0.5
      });
      ringMaterials.push(ringMaterial);
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = i * 0.6 - 1.2;
      mainGroup.add(ring);
    }

    // Vertical structural pillars (thin cylinders forming the outer bounds)
    const pillarCount = 12;
    const pillarGeo = new THREE.CylinderGeometry(0.015, 0.015, 3.2, 8);
    const pillarMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(themeColors[activeTheme].light2),
      metalness: 0.8,
      roughness: 0.2
    });

    for (let i = 0; i < pillarCount; i++) {
      const angle = (i / pillarCount) * Math.PI * 2;
      const x = Math.cos(angle) * 2.5;
      const z = Math.sin(angle) * 2.5;
      
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, 0.4, z);
      
      // Pivot pillars to curve slightly inward toward the top dome center
      pillar.rotation.x = Math.sin(angle) * 0.15;
      pillar.rotation.z = -Math.cos(angle) * 0.15;

      mainGroup.add(pillar);
    }

    // Middle core platform (Grand glowing geometric tier)
    const geoPlatform = new THREE.BoxGeometry(1.6, 0.15, 1.6);
    const matPlatform = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(themeColors[activeTheme].light1),
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const stagePlatform = new THREE.Mesh(geoPlatform, matPlatform);
    stagePlatform.position.y = -1.25;
    mainGroup.add(stagePlatform);

    // Floating central core crystal
    const crystalGeo = new THREE.OctahedronGeometry(0.7, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(themeColors[activeTheme].light2),
      emissive: new THREE.Color(themeColors[activeTheme].light1),
      emissiveIntensity: 0.6,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
      transmission: 0.9,
      thickness: 1.2
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystal.position.y = 0;
    mainGroup.add(crystal);

    // Dynamic Atmosphere: Starfield particle system
    const starCount = 350;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 15;
      starPositions[i + 1] = (Math.random() - 0.5) * 8 + 1;
      starPositions[i + 2] = (Math.random() - 0.5) * 15;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(themeColors[activeTheme].light2),
      size: 0.035,
      transparent: true,
      opacity: 0.8
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // 5. Ambient and Spotlighting in the Scene
    const ambientLight = new THREE.AmbientLight(themeColors[activeTheme].ambient);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(themeColors[activeTheme].light1, 1.5);
    dirLight1.position.set(5, 8, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(themeColors[activeTheme].light2, 1);
    dirLight2.position.set(-5, -3, 5);
    scene.add(dirLight2);

    const blueSpot = new THREE.SpotLight(themeColors[activeTheme].light3, 2.5);
    blueSpot.position.set(0, 6, 0);
    blueSpot.angle = Math.PI / 4;
    blueSpot.penumbra = 0.8;
    scene.add(blueSpot);

    // 6. User interactivity & orbit offset variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    // Scroll tracker: tilt/rotate based on page Y
    let scrollYOffset = 0;
    const handleScroll = () => {
      scrollYOffset = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // 7. Render & Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate central crystal and main group
      if (mainGroup) {
        if (isRotating) {
          mainGroup.rotation.y = elapsedTime * (0.12 * spinSpeed) + (targetX * 0.3);
        } else {
          mainGroup.rotation.y = targetX * 1.2;
        }
        mainGroup.rotation.x = (targetY * 0.2) + Math.sin(elapsedTime * 0.2) * 0.15;
        // Adjust vertically on scroll trigger (Parallax effect)
        mainGroup.position.y = -0.5 - (scrollYOffset * 0.0006);
      }

      if (crystal) {
        crystal.rotation.z = -elapsedTime * 0.3;
        crystal.rotation.y = -elapsedTime * 0.5;
        crystal.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      }

      if (stars) {
        stars.rotation.y = elapsedTime * 0.02;
        // subtle sparkle pulsations
        const sizes = starGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < starCount * 3; i += 3) {
          // shimmer effect
          sizes[i + 1] += Math.sin(elapsedTime + i) * 0.001;
        }
        starGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Responsive Design - ResizeObserver configuration
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width && height && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = width / height;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(width, height);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      renderer.dispose();
    };
  }, [activeTheme, spinSpeed, isRotating]);

  return (
    <section id="3d-experience" className="py-20 bg-space-950 relative overflow-hidden border-t border-b border-white/10">
      {/* Background atmosphere glows */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-gold-600/10 filter blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-gold-500/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-[#C5A059] text-xs uppercase tracking-[0.4em] font-bold italic mb-5">
            <Sparkles className="w-3 h-3 text-gold-400" />
            Vibrant 3D Venue Tour
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wider uppercase">
            Architectural <span className="italic font-light text-gold-500">Majesty</span>
          </h2>
          <p className="mt-4 text-sm text-white/50 leading-relaxed font-sans font-light">
            Interact with the floating digital model of our premium glass-ceil dome theater below. Hover, drag, and experiment with customizable illumination preset modes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Controls Panel */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-6">
            <div className="glass-panel p-6 sm:p-8 rounded-none flex flex-col gap-6 relative shadow-xl border-white/10 bg-[#0c0c0c]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-bl-full pointer-events-none filter blur-xl" />
              
              <div className="text-left">
                <h3 className="font-serif text-lg text-white font-medium tracking-wide flex items-center gap-2">
                  <Compass className="w-5 h-5 text-gold-500" />
                  Control Console
                </h3>
                <p className="text-[11px] text-white/40 mt-1 font-light">
                  Manipulate ambient physics and lightning settings.
                </p>
              </div>

              {/* Lighting Presets */}
              <div className="flex flex-col gap-3 text-left">
                <span className="text-[10px] font-mono font-medium tracking-widest uppercase text-gold-500 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" /> Ambient Filters
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveTheme("champagne")}
                    className={`py-2 px-3 text-[10px] uppercase tracking-wider font-semibold border transition-all rounded-none ${
                      activeTheme === "champagne"
                        ? "bg-[#C5A059] text-black border-[#C5A059]"
                        : "bg-black text-white/70 border-white/10 hover:border-white/30"
                    }`}
                  >
                    Champagne
                  </button>
                  <button
                    onClick={() => setActiveTheme("neon")}
                    className={`py-2 px-3 text-[10px] uppercase tracking-wider font-semibold border transition-all rounded-none ${
                      activeTheme === "neon"
                        ? "bg-[#C5A059] text-black border-[#C5A059]"
                        : "bg-black text-white/70 border-white/10 hover:border-white/30"
                    }`}
                  >
                    Neon
                  </button>
                  <button
                    onClick={() => setActiveTheme("monochrome")}
                    className={`py-2 px-3 text-[10px] uppercase tracking-wider font-semibold border transition-all rounded-none ${
                      activeTheme === "monochrome"
                        ? "bg-[#C5A059] text-black border-[#C5A059]"
                        : "bg-black text-white/70 border-white/10 hover:border-white/30"
                    }`}
                  >
                    Minimal
                  </button>
                </div>
              </div>

              {/* Spin Speed Slider */}
              <div className="flex flex-col gap-2 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-gold-500 uppercase tracking-widest flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5" /> Rotation Rate
                  </span>
                  <span className="font-mono text-white/80">{spinSpeed}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.5"
                  value={spinSpeed}
                  onChange={(e) => setSpinSpeed(parseFloat(e.target.value))}
                  className="w-full accent-[#C5A059] h-1 bg-black rounded-none cursor-pointer"
                />
              </div>

              {/* Auto Spin Toggle */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs font-mono text-stone-300">Continuous Axis Spinning</span>
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={`px-3 py-1 text-[10px] uppercase font-mono font-bold tracking-widest border transition-all rounded-none ${
                    isRotating
                      ? "bg-[#C5A059] border-[#C5A059] text-black"
                      : "bg-[#050505] border-white/10 text-white"
                  }`}
                >
                  {isRotating ? "ON" : "OFF"}
                </button>
              </div>

              {/* Design features indicators */}
              <div className="border-t border-white/10 pt-4 flex flex-col gap-3 text-left">
                <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">Features included</span>
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-white/50 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#C5A059]" />
                    <span>Double ring glass-dome framework (5 levels)</span>
                  </div>
                  <div className="text-xs text-white/50 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#C5A059]" />
                    <span>32-channel vertical sound barrier column models</span>
                  </div>
                  <div className="text-xs text-white/50 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#C5A059]" />
                    <span>Centralized ambient crystalline core transmitter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Canvas Container */}
          <div
            id="canvas-container-wrap"
            className="lg:col-span-8 order-1 lg:order-2 flex flex-col justify-center items-center"
          >
            <div
              ref={containerRef}
              id="atrium-3d-scene"
              className="w-full h-[320px] sm:h-[460px] md:h-[520px] glass-panel rounded-none relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing border border-white/10 shadow-2xl"
            >
              <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
              
              {/* Overlay Interactive Cues */}
              <div className="absolute bottom-5 left-5 pointer-events-none bg-[#0c0c0c]/90 border border-white/10 p-3 rounded-none text-[9px] font-mono tracking-widest uppercase flex items-center gap-2 text-white">
                <Play className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Move Mouse to Tilt Render Angle</span>
              </div>
              
              <div className="absolute top-5 right-5 pointer-events-none bg-black border border-white/10 px-3 py-1.5 rounded-none text-[9px] uppercase font-mono tracking-widest text-[#C5A059] flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#C5A059] animate-pulse" />
                Live Renderer Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
