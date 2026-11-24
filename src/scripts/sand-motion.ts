import goldRidges from '../data/gold-ridges.json';

// One material language: light travels along real gold ridges at home and orbital edges elsewhere.
const surface = document.querySelector<HTMLElement>('[data-motion-surface]');
const canvas = surface?.querySelector<HTMLCanvasElement>('[data-sand-canvas]');
const toggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
if (surface && canvas && toggle) {
  const context = canvas.getContext('2d');
  const home = surface.hasAttribute('data-home-project');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = reduced.matches;
  let paused = false;
  try { paused = localStorage.getItem('kbber-motion-paused') === 'true'; } catch {}
  let visible = true;
  let lightTheme = document.documentElement.classList.contains('light-mode');
  let frame = 0;
  let lastTime = 0;
  let phase = 0;
  let width = 0;
  let height = 0;
  let surfaceHeight = 0;
  const grains = Array.from({ length: home ? 76 : 36 }, (_, i) => ({
    x: ((i * 73 + 19) % 997) / 997,
    y: ((i * 131 + 43) % 991) / 991,
    radius: .8 + (i % 4) * .35,
    speed: 16 + (i % 5) * 4,
    offset: i * 1.73,
  }));
  type Point = { x: number; y: number };
  const upperPoints = goldRidges.upper.points;
  const lowerPoints = goldRidges.lower.points;
  function ridgePoint(points: number[][], progress: number, bottom = false): Point {
    const position = Math.max(0, Math.min(.99999, progress)) * (points.length - 1);
    const index = Math.floor(position);
    const fraction = position - index;
    const a = points[index];
    const b = points[Math.min(index + 1, points.length - 1)];
    const x = (a[0] + (b[0] - a[0]) * fraction) * width;
    const y = (a[1] + (b[1] - a[1]) * fraction) * width;
    return { x, y: bottom ? surfaceHeight - width * goldRidges.lower.ratio + y : y };
  }
  function strokeTrail(sample: (position: number) => Point, progress: number, trail: number, alpha = 1, wrap = false) {
    if (!context) return;
    const color = lightTheme ? '140,87,28' : '255,216,145';
    const fade = wrap ? 1 : Math.min(1, progress * 12, (1 - progress) * 12);
    context.lineWidth = home ? 2.2 : 1.8;
    context.lineCap = 'round';
    for (let i = 18; i > 0; i--) {
      const p = progress - trail * i / 18;
      if (!wrap && p < 0) continue;
      const a = sample(p);
      const b = sample(progress - trail * (i - 1) / 18);
      context.strokeStyle = `rgba(${color},${alpha * fade * (1 - i / 19) * .86})`;
      context.beginPath();context.moveTo(a.x, a.y);context.lineTo(b.x, b.y);context.stroke();
    }
    const point = sample(progress);
    context.fillStyle = `rgba(${lightTheme ? '130,77,22' : '255,242,207'},${alpha * fade})`;
    context.beginPath();context.arc(point.x, point.y, home ? 2.7 : 2.5, 0, Math.PI * 2);context.fill();
  }
  function drawOrbits(animated: boolean) {
    if (!context) return;
    const radius = Math.max(150, Math.min(270, width * .24));
    const orbits = [
      { x: width + radius * .16, y: radius * .62, radius, start: 2.12, speed: -.32 },
      { x: width + radius * .16, y: radius * .62, radius: radius * 1.24, start: 3.05, speed: .27 },
      { x: -radius * .42, y: height + radius * .12, radius: radius * .9, start: 5.4, speed: .30 },
    ];
    for (const orbit of orbits) {
      context.lineWidth = 1;
      context.strokeStyle = lightTheme ? 'rgba(132,88,31,.22)' : 'rgba(208,153,71,.24)';
      context.beginPath();context.arc(orbit.x, orbit.y, orbit.radius, 0, Math.PI * 2);context.stroke();
      if (animated) {
        for (let head = 0; head < 4; head++) {
          const angle = orbit.start + phase * orbit.speed + head * Math.PI / 2;
          strokeTrail(p => ({ x: orbit.x + Math.cos(angle + p * Math.sign(orbit.speed)) * orbit.radius, y: orbit.y + Math.sin(angle + p * Math.sign(orbit.speed)) * orbit.radius }), 0, .34, .95, true);
        }
      }
    }
  }
  function render(animated = true) {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    if (!home) drawOrbits(animated);
    if (!animated) return;
    if (home) {
      for (let i = 0; i < 3; i++) {
        strokeTrail(p => ridgePoint(upperPoints, p), (phase / 7.5 + .13 + i / 3) % 1, .055);
        if (surfaceHeight - width * goldRidges.lower.ratio < height) {
          strokeTrail(p => ridgePoint(lowerPoints, p, true), (phase / 9 + .27 + i / 3) % 1, .045, .92);
        }
      }
    }
    for (const grain of grains) {
      const nx = (grain.x + phase * grain.speed / Math.max(width, 1)) % 1;
      const ny = ((grain.y - phase * 9 / Math.max(height, 1)) % 1 + 1) % 1;
      const fade = Math.min(1, nx * 12, (1 - nx) * 12, ny * 12, (1 - ny) * 12);
      const alpha = (home ? .52 : .30) * fade * (.8 + .2 * Math.sin(phase + grain.offset));
      context.fillStyle = `rgba(${lightTheme ? '140,87,28' : '240,188,92'},${alpha})`;
      context.beginPath();context.arc(nx * width, ny * height, grain.radius, 0, Math.PI * 2);context.fill();
    }
  }
  function resize() {
    if (!canvas || !surface || !context) return;
    const bounds = surface.getBoundingClientRect();
    width = bounds.width;
    surfaceHeight = bounds.height;
    height = Math.min(bounds.height, window.innerHeight);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    render(!reduceMotion);
  }
  function draw(time: number) {
    frame = 0;
    if (paused || reduceMotion || !visible || document.hidden) return;
    if (time - lastTime >= 32) {
      phase += Math.min((time - lastTime) / 1000, .05);
      lastTime = time;
      render();
    }
    frame = requestAnimationFrame(draw);
  }
  function synchronize() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (!surface || !toggle) return;
    const state = reduceMotion ? 'reduced' : paused ? 'paused' : document.hidden ? 'hidden' : !visible ? 'offscreen' : 'running';
    surface.dataset.backgroundMotion = state;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.disabled = reduceMotion;
    const label = reduceMotion ? '\u5df2\u51cf\u5c11\u52a8\u6001\u6548\u679c' : paused ? '\u64ad\u653e\u80cc\u666f\u52a8\u6548' : '\u6682\u505c\u80cc\u666f\u52a8\u6548';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
    const text = toggle.querySelector('[data-motion-label]');
    if (text) text.textContent = label;
    if (reduceMotion) render(false);
    if (state === 'running') {
      lastTime = performance.now();
      frame = requestAnimationFrame(draw);
    }
  }
  toggle.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('kbber-motion-paused', String(paused)); } catch {}
    synchronize();
  });
  if (home) {
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; synchronize(); }, { threshold: .05 });
    observer.observe(surface);
  }
  new ResizeObserver(resize).observe(surface);
  new MutationObserver(() => {
    const next = document.documentElement.classList.contains('light-mode');
    if (next !== lightTheme) { lightTheme = next; render(!reduceMotion); }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  reduced.addEventListener('change', event => { reduceMotion = event.matches; synchronize(); });
  window.addEventListener('focus', () => { reduceMotion = reduced.matches; synchronize(); });
  document.addEventListener('visibilitychange', synchronize);
  resize();synchronize();
}
