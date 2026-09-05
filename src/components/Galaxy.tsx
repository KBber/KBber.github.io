import { useEffect, useRef } from 'react';

interface Star {
  x: number;     // -1..1 (will be scaled by depth)
  y: number;     // -1..1
  z: number;     // 0..1, 0 = camera, 1 = far
  color: string;
  size: number;  // base pixel size
  speed: number; // forward velocity (units per second toward camera)
}

const STAR_PALETTE = [
  '#ffffff', // white dwarf
  '#dbe7ff', // bluish-white
  '#bcd6ff', // blue
  '#fff0c8', // warm yellow
  '#ffd9a8', // orange giant
  '#ffb0b0', // red giant
  '#c8b6ff', // violet
];

/**
 * Galaxy — a forward-zoom starfield with depth, parallax, and nebula glow.
 *
 * Three depth bands (far / mid / near), each ~150 stars, move toward the camera.
 * When a star's z drops below 0 it recycles to z = 1 with a new random position.
 * Mouse position shifts the "camera" subtly for a parallax effect.
 */
export default function Galaxy() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    reduceMotion.current =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let cx = 0, cy = 0;
    let mouseX = 0, mouseY = 0;
    let camX = 0, camY = 0;

    const STAR_LAYERS = [
      { count: 220, sizeBase: 0.7, speedMin: 0.04, speedMax: 0.10, colorBias: 0, parallax: 0.4 },
      { count: 160, sizeBase: 1.2, speedMin: 0.10, speedMax: 0.22, colorBias: 1, parallax: 0.7 },
      { count: 90,  sizeBase: 2.0, speedMin: 0.22, speedMax: 0.45, colorBias: 2, parallax: 1.0 },
    ];

    let layers: Star[][] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const seed = (layer: typeof STAR_LAYERS[number]): Star[] => {
      const arr: Star[] = [];
      for (let i = 0; i < layer.count; i++) {
        const color = STAR_PALETTE[
          Math.floor(rand(0, 1) * 4) + layer.colorBias * 0
        ] || STAR_PALETTE[0];
        arr.push({
          x: rand(-1.4, 1.4),
          y: rand(-1.0, 1.0),
          z: Math.random(),
          color,
          size: layer.sizeBase * rand(0.6, 1.6),
          speed: rand(layer.speedMin, layer.speedMax),
        });
      }
      return arr;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cx = W / 2;
      cy = H / 2;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onDevice = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      mouseX = Math.max(-1, Math.min(1, e.gamma / 30));
      mouseY = Math.max(-1, Math.min(1, (e.beta - 30) / 30));
    };

    // Build initial layers
    const build = () => {
      layers = STAR_LAYERS.map(seed);
    };

    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // Ease camera toward mouse
      camX += (mouseX * 60 - camX) * 0.04;
      camY += (mouseY * 40 - camY) * 0.04;

      // Clear with a slight trail (creates motion blur on stars)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(8, 10, 18, 0.35)';
      ctx.fillRect(0, 0, W, H);

      // Soft nebula glow at center
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
      grad.addColorStop(0, 'rgba(124, 92, 255, 0.18)');
      grad.addColorStop(0.4, 'rgba(59, 130, 246, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Stars
      ctx.globalCompositeOperation = 'lighter';
      const focal = Math.min(W, H) * 0.9;

      STAR_LAYERS.forEach((layer, li) => {
        const stars = layers[li];
        const parallax = layer.parallax;

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          if (!reduceMotion.current) {
            s.z -= s.speed * dt;
            if (s.z <= 0.02) {
              // recycle to far
              s.z = 1 + Math.random() * 0.3;
              s.x = rand(-1.4, 1.4);
              s.y = rand(-1.0, 1.0);
            }
          }

          // Perspective project
          const invZ = 1 / Math.max(s.z, 0.02);
          const sx = cx + (s.x * focal + camX * parallax * 12) * invZ;
          const sy = cy + (s.y * focal + camY * parallax * 8) * invZ;

          // Size grows as star approaches
          const scale = invZ;
          const radius = Math.max(0.3, s.size * scale * 2.2);
          const alpha = Math.min(1, (1.05 - s.z) * 1.2) * (0.6 + scale * 0.4);

          // Glow (bright halo when close)
          if (scale > 1.3) {
            const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 6);
            g.addColorStop(0, s.color);
            g.addColorStop(0.3, hexWithAlpha(s.color, alpha * 0.45));
            g.addColorStop(1, hexWithAlpha(s.color, 0));
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(sx, sy, radius * 6, 0, Math.PI * 2);
            ctx.fill();
          }

          // Core
          ctx.fillStyle = hexWithAlpha(s.color, alpha);
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    build();
    rafRef.current = requestAnimationFrame((t) => {
      last = t;
      draw(t);
    });

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('deviceorientation', onDevice);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('deviceorientation', onDevice);
    };
  }, []);

  return (
    <div className="galaxy-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="galaxy-canvas" />
      <div className="galaxy-vignette" />
    </div>
  );
}

function hexWithAlpha(hex: string, a: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`;
}
