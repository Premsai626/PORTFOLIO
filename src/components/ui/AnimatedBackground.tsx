import React, { useEffect, useRef } from 'react';

/**
 * AnimatedBackground
 * High-performance, battery-friendly ambient background engine.
 * Specifically engineered to run at a deliberate, low-overhead FPS (24-28 FPS)
 * using delta-time throttling to reduce CPU/GPU power consumption while providing
 * rich, responsive mouse-interactive physics and geometric animations.
 */
export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // -----------------------------------------------------------------
    // Interactive Mouse & Ripple State
    // -----------------------------------------------------------------
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;
    let isMouseOver = false;

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
      color: string;
    }
    const ripples: Ripple[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isMouseOver = true;

      // Spawn subtle trail ripple on significant movement
      if (Math.random() < 0.15 && ripples.length < 8) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 10,
          maxRadius: 140,
          alpha: 0.35,
          speed: 3.5,
          color: 'rgba(56, 189, 248, ',
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 12,
        maxRadius: 260,
        alpha: 0.6,
        speed: 5.5,
        color: 'rgba(129, 140, 248, ',
      });
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      targetMouseX = width / 2;
      targetMouseY = height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // -----------------------------------------------------------------
    // 1. Interactive Low-FPS Constellation Physics Nodes
    // -----------------------------------------------------------------
    interface ConstellationNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      glowColor: string;
      pulseSpeed: number;
      pulsePhase: number;
    }

    const nodeCount = Math.min(46, Math.max(24, Math.floor((width * height) / 38000)));
    const nodes: ConstellationNode[] = [];
    const colors = [
      { fill: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)' },
      { fill: '#818cf8', glow: 'rgba(129, 140, 248, 0.4)' },
      { fill: '#34d399', glow: 'rgba(52, 211, 153, 0.4)' },
      { fill: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)' },
      { fill: '#c084fc', glow: 'rgba(192, 132, 252, 0.4)' },
    ];

    for (let i = 0; i < nodeCount; i++) {
      const c = colors[i % colors.length];
      const r = 1.6 + Math.random() * 2.2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: r,
        baseRadius: r,
        color: c.fill,
        glowColor: c.glow,
        pulseSpeed: 0.03 + Math.random() * 0.04,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // -----------------------------------------------------------------
    // 2. 3D Geodesic Icosahedron Wireframe
    // -----------------------------------------------------------------
    interface Point3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
    }

    const polyPoints: Point3D[] = [];
    const polyRadius = Math.min(width, height) * 0.32;
    const numPolyPoints = 36;
    const phi = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numPolyPoints; i++) {
      const theta = (2 * Math.PI * i) / phi;
      const y = 1 - (i / (numPolyPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      polyPoints.push({
        x: x * polyRadius,
        y: y * polyRadius,
        z: z * polyRadius,
        baseX: x * polyRadius,
        baseY: y * polyRadius,
        baseZ: z * polyRadius,
      });
    }

    const polyEdges: [number, number][] = [];
    const maxPolyDist = polyRadius * 0.7;
    for (let i = 0; i < numPolyPoints; i++) {
      for (let j = i + 1; j < numPolyPoints; j++) {
        const dx = polyPoints[i].baseX - polyPoints[j].baseX;
        const dy = polyPoints[i].baseY - polyPoints[j].baseY;
        const dz = polyPoints[i].baseZ - polyPoints[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxPolyDist) {
          polyEdges.push([i, j]);
        }
      }
    }

    // -----------------------------------------------------------------
    // 3. Cyber Matrix Perspective Ground Grid
    // -----------------------------------------------------------------
    const gridCols = 18;
    const gridRows = 10;
    const gridSpacing = 70;

    // -----------------------------------------------------------------
    // Animation Timing & Low-FPS Frame Budget Engine (25 FPS Target)
    // -----------------------------------------------------------------
    const TARGET_FPS = 26; // Low FPS budget for ultra-low CPU footprint & cinematic pace
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastFrameTime = performance.now();

    let rotX = 0;
    let rotY = 0;
    let simTime = 0;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);

      // Frame throttle logic for low-FPS budget
      const elapsed = now - lastFrameTime;
      if (elapsed < FRAME_INTERVAL) return;

      lastFrameTime = now - (elapsed % FRAME_INTERVAL);

      if (document.hidden) return; // Skip if tab is in background

      simTime += 0.024;

      // Smooth mouse interpolation (Damped spring follow)
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      const normMouseX = (currentMouseX / width - 0.5) * 2;
      const normMouseY = (currentMouseY / height - 0.5) * 2;

      // 1. Render Deep Space Cosmic Background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive Ambient Radial Spotlight
      const ambientGlow = ctx.createRadialGradient(
        currentMouseX,
        currentMouseY,
        30,
        currentMouseX,
        currentMouseY,
        Math.max(width * 0.45, 450)
      );
      ambientGlow.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
      ambientGlow.addColorStop(0.4, 'rgba(99, 102, 241, 0.05)');
      ambientGlow.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Render and Update Interactive Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha *= 0.94;

        if (r.alpha > 0.01 && r.radius < r.maxRadius) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `${r.color}${r.alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          ripples.splice(i, 1);
        }
      }

      // 4. Render 3D Polyhedron Wireframe in Background
      rotX += 0.003 + normMouseY * 0.0015;
      rotY += 0.004 + normMouseX * 0.0015;

      const polyCenterX = width * 0.78;
      const polyCenterY = height * 0.45;
      const cameraZ = 550;
      const focalLength = 400;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const projectedPoly: { x: number; y: number; z: number; scale: number }[] = [];

      for (let i = 0; i < polyPoints.length; i++) {
        const pt = polyPoints[i];

        // Rotate Y & X
        const x1 = pt.baseX * cosY + pt.baseZ * sinY;
        const y1 = pt.baseY;
        const z1 = -pt.baseX * sinY + pt.baseZ * cosY;

        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const scale = focalLength / (z2 + cameraZ);
        const px = polyCenterX + x2 * scale;
        const py = polyCenterY + y2 * scale;

        projectedPoly.push({ x: px, y: py, z: z2, scale });
      }

      // Draw Polyhedron Edges
      for (let i = 0; i < polyEdges.length; i++) {
        const [idx1, idx2] = polyEdges[i];
        const p1 = projectedPoly[idx1];
        const p2 = projectedPoly[idx2];
        const avgZ = (p1.z + p2.z) / 2;
        const edgeAlpha = Math.max(0.02, Math.min(0.25, (avgZ + polyRadius) / (polyRadius * 2) * 0.28));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(56, 189, 248, ${edgeAlpha})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // Draw Polyhedron Vertices
      for (let i = 0; i < projectedPoly.length; i++) {
        const p = projectedPoly[i];
        const vertexAlpha = Math.max(0.08, (p.z + polyRadius) / (polyRadius * 2) * 0.6);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, 2.2 * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${vertexAlpha})`;
        ctx.fill();
      }

      // 5. Render Perspective Ground Wave Grid
      const gridCenterY = height * 0.88;
      for (let r = 0; r < gridRows; r++) {
        const zDepth = (r + 1) * 45;
        const scale = 320 / (zDepth + 180);
        const yPos = gridCenterY + (r - gridRows / 2) * (gridSpacing * scale);

        ctx.beginPath();
        for (let c = 0; c < gridCols; c++) {
          const xOffset = (c - gridCols / 2) * (gridSpacing * 2 * scale);
          const wave =
            Math.sin(c * 0.45 + simTime * 1.8) * 10 * scale +
            Math.cos(r * 0.6 + simTime * 1.2) * 6 * scale;
          const xScreen = width / 2 + xOffset + normMouseX * 15;
          const yScreen = yPos + wave;

          if (c === 0) {
            ctx.moveTo(xScreen, yScreen);
          } else {
            ctx.lineTo(xScreen, yScreen);
          }
        }
        const alpha = Math.max(0.015, (1 - r / gridRows) * 0.12);
        ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 6. Update and Draw Interactive Constellation Nodes
      const connectionDist = 140;
      const mouseAttractDist = 180;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move nodes at low FPS
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          // Wrap around viewport edges
          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;

          // Interactive Magnetic Attraction to Mouse
          if (isMouseOver) {
            const dx = currentMouseX - node.x;
            const dy = currentMouseY - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseAttractDist && dist > 1) {
              const force = (1 - dist / mouseAttractDist) * 0.08;
              node.x += (dx / dist) * force * 15;
              node.y += (dy / dist) * force * 15;
            }
          }
        }

        // Draw connections between neighboring nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw Interactive Laser Connection to Cursor
        if (isMouseOver) {
          const dx = currentMouseX - node.x;
          const dy = currentMouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseAttractDist) {
            const alpha = (1 - dist / mouseAttractDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(currentMouseX, currentMouseY);
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        // Draw Node Core & Subtle Pulse
        node.pulsePhase += node.pulseSpeed;
        const currentRadius = node.baseRadius + Math.sin(node.pulsePhase) * 0.6;

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* Background Ambience Layers */}
      <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-br from-sky-600/15 via-indigo-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[850px] h-[850px] bg-gradient-to-bl from-purple-600/15 via-fuchsia-600/10 to-transparent rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[900px] h-[900px] bg-gradient-to-tr from-cyan-600/15 via-emerald-600/10 to-transparent rounded-full blur-[180px] pointer-events-none" />

      {/* Cyber Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Interactive Low-FPS Canvas Engine */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
