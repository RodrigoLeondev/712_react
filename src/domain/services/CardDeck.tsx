import { useState, type CSSProperties } from 'react';
import type { CardDeckProps } from '@/domain/services/types';
import styles from './CardDeck.module.css';

export default function CardDeck({ items }: CardDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = () => setActiveIndex((i) => (i + 1) % items.length);

  return (
    <div className={styles.deck} onClick={advance} aria-live="polite">
      {items.map((item, i) => {
        const depth = (i - activeIndex + items.length) % items.length;

        return (
          <article
            key={item.id}
            className={styles.card}
            style={{ '--depth': depth } as CSSProperties}
            aria-hidden={depth !== 0}
          >
            <span className={styles.sparkle} aria-hidden="true">
              ✦
            </span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
          </article>
        );
      })}

      <div className={styles.dots}>
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.dot} ${i === activeIndex ? styles.isActive : ''}`}
            aria-label={`Ver ${item.title}`}
            aria-current={i === activeIndex}
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
