import type { CSSProperties } from 'react';
import { useScrollProgress } from '@/infrastructure/lib/hooks/useScrollProgress';
import Title from '@/infrastructure/ui/text/Title';
import styles from './About.module.css';
import StackedCard from '@/domain/about/StackedCard';
import CollapseStack from '@/domain/about/CollapseStack';

export default function About() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <>
      {/* Escenario del parallax: título, cuadro y animación superpuestos. */}
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
        <div className={styles.video}></div>
      </div>
    </>
  );
}
