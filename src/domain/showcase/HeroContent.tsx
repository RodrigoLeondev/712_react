import { useEffect, useRef } from 'react';
import type { HeroContentProps, HighlightKey } from '@/domain/showcase/types';
import styles from './HeroContent.module.css';

const STEP = 0.12; 
const LOGO_TIME = 0.8; 

const WORD_HIGHLIGHTS: Record<string, HighlightKey> = {
  creatividad: 'green',
};
const PHRASE = ['contexto', 'de', 'negocio'];

export default function HeroContent({ badgeText, title }: HeroContentProps) {
  const words = title.split(' ');

  const clean = words.map((word) => word.toLowerCase().replace(/[.,;:]/g, ''));
  const phraseIndices = new Set<number>();
  for (let i = 0; i <= clean.length - PHRASE.length; i++) {
    if (PHRASE.every((p, j) => clean[i + j] === p)) {
      PHRASE.forEach((_, j) => phraseIndices.add(i + j));
    }
  }
  const audiovisualIndices = clean.reduce<number[]>((acc, word, i) => {
    if (word === 'audiovisual') acc.push(i);
    return acc;
  }, []);
  const roseIndex = audiovisualIndices[1] ?? -1;

  const highlightFor = (i: number): HighlightKey | null => {
    if (i === roseIndex) return 'rose';
    if (WORD_HIGHLIGHTS[clean[i]]) return WORD_HIGHLIGHTS[clean[i]];
    if (phraseIndices.has(i)) return 'redOrange';
    return null;
  };

  const logoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = logoWrapRef.current;
      if (!el) return;
      el.style.opacity = String(Math.max(0, 1 - window.scrollY / 220));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.hero}>
      <div ref={logoWrapRef} className={styles.logoWrap}>
        <img className={styles.logo} src="/Logo.svg" alt={badgeText || '712'} />
      </div>

      <h1 className={styles.title}>
        {words.map((word, i) => {
          const highlight = highlightFor(i);
          return (
            <span
              key={`${word}-${i}`}
              className={[styles.word, highlight && styles[highlight]]
                .filter(Boolean)
                .join(' ')}
              style={{ animationDelay: `${LOGO_TIME + i * STEP}s` }}
            >
              {word}
            </span>
          );
        })}
      </h1>
    </div>
  );
}
