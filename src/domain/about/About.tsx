import type { CSSProperties } from 'react';
import { useScrollProgress } from '@/infrastructure/lib/hooks/useScrollProgress';
import Title from '@/infrastructure/ui/text/Title';
import styles from './About.module.css';
import StackedCard from '@/domain/about/StackedCard';
import CollapseStack from '@/domain/about/CollapseStack';
import TagPill from '@/infrastructure/ui/pill/TagPill';
import YouTubeEmbed from '@/infrastructure/ui/video/YouTubeEmbed';

const PORTAFOLIO_VIDEO_URL = 'https://youtu.be/YplOIN2JRBw';

export default function About() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <>
      <div
        ref={ref}
        className={styles.stage}
        style={{ '--p': progress } as CSSProperties}
      >
        <Title title="Sobre" highlight="Nosotros" />

        <span className={styles.box} aria-hidden="true" />
        <img
          className={styles.anim}
          src="/animations/about.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      <div className={styles.cards}>
        <StackedCard
        />
      </div>
      <div className={styles.portafolio}>
        <div className={styles.cardCollapsed}>
          <CollapseStack />
        </div>
        <div className={styles.video}>
          <div className={styles.videoLabel}>
            <TagPill label="Portafolio" tone='redOrange' tilt={-4.2} size="lg" />
          </div>
          <YouTubeEmbed videoUrl={PORTAFOLIO_VIDEO_URL} title="Portafolio 712" />
        </div>
      </div>
    </>
  );
}
