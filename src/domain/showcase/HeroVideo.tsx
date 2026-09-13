import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { HeroVideoProps } from '@/domain/showcase/types';
import YouTubeEmbed from '@/infrastructure/ui/video/YouTubeEmbed';
import styles from './HeroVideo.module.css';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HeroVideo({ videoUrl }: HeroVideoProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const ratio = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      setProgress(ratio);
    };

    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const p = reduced ? 1 : progress;

  return (
    <div ref={trackRef} className={styles.track}>
      <div className={styles.stage}>
        <div
          className={styles.wrapper}
          style={{ '--p': p } as CSSProperties}
        >
          <YouTubeEmbed videoUrl={videoUrl} />
        </div>
      </div>
    </div>
  );
}
