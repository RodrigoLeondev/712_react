import { useEffect, useRef, useState } from 'react';
import type { HeroVideoProps } from '@/domain/showcase/types';
import YouTubeEmbed from '@/infrastructure/ui/video/YouTubeEmbed';
import styles from './HeroVideo.module.css';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HeroVideo({ videoUrl }: HeroVideoProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

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
  const translateY = (1 - p) * 320;
  const rotateX = (1 - p) * 18;
  const scaleValue = 0.92 + p * (1 - 0.92);

  return (
    <div ref={trackRef} className={styles.track}>
      <div className={styles.stage}>
        <div
          className={styles.wrapper}
          style={{
            transform: `translate(-50%, -50%) translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scaleValue})`,
          }}
        >
          <YouTubeEmbed videoUrl={videoUrl} />
        </div>
      </div>
    </div>
  );
}
