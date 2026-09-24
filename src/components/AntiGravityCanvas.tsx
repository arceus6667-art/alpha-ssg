import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  rotation: number;
  vRot: number;
}

interface AntiGravityCanvasProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
  theme?: 'green' | 'slate' | 'mixed';
}

export default function AntiGravityCanvas({
  className = '',
  particleCount = 48,
  interactive = true,
  theme = 'green',
}: AntiGravityCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Color palettes (vibrant emerald / mint / teal / digital green)
    const greenColors = [
      '#059669', // emerald-600
      '#10b981', // emerald-500
      '#047857', // emerald-700
      '#34d399', // emerald-400
      '#0d9488', // teal-600
      '#14b8a6', // teal-500
      '#6ee7b7', // mint-300
    ];
    const slateColors = ['#64748b', '#94a3b8', '#cbd5e1', '#059669'];
    const mixedColors = [...greenColors, '#64748b', '#94a3b8'];

    const chosenPalette =
      theme === 'green' ? greenColors : theme === 'slate' ? slateColors : mixedColors;

    // Mouse coordinates in canvas local space
    let mouse = {
      x: -9999,
      y: -9999,
      radius: 140,
    };

    // Create particles with anti-gravity floating physics
    const count = Math.max(50, Math.min(particleCount, Math.floor((width * height) / 16000)));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() < 0.5 ? 4 : Math.random() < 0.8 ? 5 : 7, // crisp digital pixel size
        vx: (Math.random() - 0.5) * 0.5, // gentle horizontal drift
        vy: -0.3 - Math.random() * 0.5, // anti-gravity upward float
        baseAlpha: 0.35 + Math.random() * 0.45, // clear, high visibility
        alpha: 0.35,
        color: chosenPalette[Math.floor(Math.random() * chosenPalette.length)],
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.02,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.66, 2.5); // normalize to ~60fps
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Anti-gravity upward float with subtle horizontal sine wave
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.vRot * dt;

        // Interactive mouse anti-gravity repulsion field
        if (interactive && mouse.x > 0 && mouse.y > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 1.5;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 3.5 * dt;
            p.y += Math.sin(angle) * force * 3.5 * dt;
            // Flare alpha slightly when disturbed
            p.alpha = Math.min(1, p.baseAlpha * 1.8);
          } else {
            // Smoothly return to base alpha
            p.alpha += (p.baseAlpha - p.alpha) * 0.05 * dt;
          }
        }

        // Boundary wrap (loop from bottom when floating off the top)
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Render crisp digital square pixel
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Draw crisp digital square particle (not rounded/bubbly)
        const half = p.size / 2;
        ctx.fillRect(-half, -half, p.size, p.size);

        // Optional micro-core highlight for futuristic feel
        if (p.size >= 4) {
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = p.alpha * 0.6;
          ctx.fillRect(-half + 1, -half + 1, p.size - 2, p.size - 2);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [particleCount, interactive, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
    />
  );
}
