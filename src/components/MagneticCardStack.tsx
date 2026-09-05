import { useEffect, useRef, useState } from 'react';

export interface MagnetCardItem {
  id: string;
  title: string;
  body: string;
  href?: string;
  accent?: string;
}

interface Props {
  items: MagnetCardItem[];
}

/**
 * MagneticCardStack — lightly draggable glass cards that "snap home".
 *
 * Pure pointer-events implementation (no GSAP dependency) so the site
 * remains a few hundred KB. Uses rAF for smoothness and respects
 * `prefers-reduced-motion`.
 */
export default function MagneticCardStack({ items }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [dragging, setDragging] = useState(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const SNAP = 180;
    const cleanups: Array<() => void> = [];

    cards.forEach((card, idx) => {
      let active = false;
      let pid: number | null = null;
      let startX = 0, startY = 0;
      let curX = 0, curY = 0;
      let homeX = 0, homeY = 0;

      const down = (e: PointerEvent) => {
        if (reduceMotion.current) return;
        active = true;
        pid = e.pointerId;
        setDragging(true);
        card.classList.add('is-dragging');
        card.setPointerCapture(e.pointerId);
        startX = e.clientX - curX;
        startY = e.clientY - curY;
      };
      const move = (e: PointerEvent) => {
        if (!active || pid !== e.pointerId) return;
        curX = e.clientX - startX;
        curY = e.clientY - startY;
        const dist = Math.hypot(curX, curY);
        if (dist < SNAP) {
          const r = 1 - dist / SNAP;
          // Slight inward pull
          curX -= curX * r * 0.15;
          curY -= curY * r * 0.15;
        }
        card.style.transform = `translate3d(${curX}px, ${curY}px, 0) rotate(${curX * 0.02}deg)`;
      };
      const up = (e: PointerEvent) => {
        if (!active || pid !== e.pointerId) return;
        active = false;
        card.classList.remove('is-dragging');
        try { card.releasePointerCapture(e.pointerId); } catch {}
        pid = null;
        setDragging(false);
        // Spring back
        card.animate(
          [
            { transform: `translate3d(${curX}px, ${curY}px, 0)` },
            { transform: 'translate3d(0,0,0) rotate(0)' },
          ],
          { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        ).onfinish = () => {
          card.style.transform = '';
          curX = 0; curY = 0;
        };
      };
      const cancel = (e: PointerEvent) => up(e);

      card.addEventListener('pointerdown', down);
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerup', up);
      card.addEventListener('pointercancel', cancel);

      cleanups.push(() => {
        card.removeEventListener('pointerdown', down);
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerup', up);
        card.removeEventListener('pointercancel', cancel);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [items]);

  return (
    <div className="magnetic-stack" ref={containerRef} data-dragging={dragging}>
      {items.map((item, i) => (
        <a
          key={item.id}
          href={item.href || '#'}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="magnet-card"
          style={item.accent ? ({ ['--accent' as any]: item.accent } as React.CSSProperties) : undefined}
        >
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </a>
      ))}
    </div>
  );
}
