import { useEffect, useState } from 'react';

/**
 * ReadingProgress — fixed-top bar showing article scroll progress.
 * Used by the [slug].astro page wrapper around the markdown content.
 */
export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const total = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      const p = total > 0 ? Math.min(100, Math.max(0, (scrollTop / total) * 100)) : 0;
      setPct(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div className="reading-progress" style={{ width: `${pct}%` }} aria-hidden="true" />;
}
