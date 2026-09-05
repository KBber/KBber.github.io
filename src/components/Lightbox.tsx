import { useEffect, useState } from 'react';

interface Photo {
  src: string;
  caption?: string;
}

interface Props {
  photos: Photo[];
}

/**
 * Lightbox — click an album thumbnail to open a full-screen viewer.
 * Use arrow keys, on-screen controls, or swipe to navigate.
 */
export default function Lightbox({ photos }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') setIndex((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === 'ArrowLeft') setIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [index, photos.length]);

  return (
    <>
      <div className="album-grid">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            className="album-thumb"
            onClick={() => setIndex(i)}
            aria-label={`Open ${p.caption || `photo ${i + 1}`}`}
          >
            <img src={p.src} alt={p.caption || ''} loading="lazy" />
            {p.caption && <span className="label">{p.caption}</span>}
          </button>
        ))}
      </div>
      {index !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setIndex(null)}>
          <button
            className="close"
            type="button"
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); setIndex(null); }}
          >×</button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
            }}
            style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.15)'
            }}
          >‹</button>
          <img src={photos[index].src} alt={photos[index].caption || ''} onClick={(e) => e.stopPropagation()} />
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? null : (i + 1) % photos.length));
            }}
            style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.15)'
            }}
          >›</button>
        </div>
      )}
    </>
  );
}
