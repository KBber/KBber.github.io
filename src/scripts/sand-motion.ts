// A bounded drift of gold dust; the approved raster artwork remains still.
const canvas = document.querySelector<HTMLCanvasElement>('[data-sand-canvas]');
const toggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const hero = document.querySelector<HTMLElement>('[data-home-project]');
if (canvas && toggle && hero) {
  const context = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = reduced.matches;
  let paused = false;
  try { paused = localStorage.getItem('kbber-motion-paused') === 'true'; } catch {}
  let visible = true;
  let frame = 0;
  let lastTime = 0;
  let phase = 0;
  let width = 0;
  let height = 0;
  const grains = Array.from({ length: 38 }, (_, i) => ({
    x: ((i * 73 + 19) % 997) / 997,
    y: ((i * 131 + 43) % 991) / 991,
    radius: 0.45 + (i % 4) * .24,
    offset: i * 1.73,
  }));
  function resize() {
    if (!canvas || !hero || !context) return;
    const bounds = hero.getBoundingClientRect();
    width = bounds.width;
    height = Math.min(bounds.height, window.innerHeight);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function updateControl() {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.disabled = reduceMotion;
    toggle.textContent = reduceMotion ? '已减少动态效果' : paused ? '播放背景动效' : '暂停背景动效';
  }
  function draw(time: number) {
    frame = 0;
    if (!context || !canvas || paused || reduceMotion || !visible || document.hidden) return;
    // About 30 frames per second; each point moves in a small local orbit.
    if (time - lastTime >= 32) {
      phase += Math.min((time - lastTime) / 1000, .05);
      lastTime = time;
      context.clearRect(0, 0, width, height);
      for (const grain of grains) {
        const x = grain.x * width + Math.sin(phase * .16 + grain.offset) * 12;
        const y = grain.y * height + Math.cos(phase * .12 + grain.offset) * 8;
        context.beginPath();
        context.arc(x, y, grain.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(240,188,92,.38)';
        context.fill();
      }
    }
    frame = requestAnimationFrame(draw);
  }
  function synchronize() {
    cancelAnimationFrame(frame);
    frame = 0;
    updateControl();
    if (reduceMotion) context?.clearRect(0, 0, width, height);
    if (!paused && !reduceMotion && visible && !document.hidden) {
      lastTime = performance.now();
      frame = requestAnimationFrame(draw);
    }
  }
  toggle.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('kbber-motion-paused', String(paused)); } catch {}
    synchronize();
  });
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    synchronize();
  }, { threshold: .05 });
  observer.observe(hero);
  new ResizeObserver(resize).observe(hero);
  reduced.addEventListener('change', (event) => {
    reduceMotion = event.matches;
    synchronize();
  });
  window.addEventListener('focus', () => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    synchronize();
  });
  document.addEventListener('visibilitychange', synchronize);
  resize();
  synchronize();
}
