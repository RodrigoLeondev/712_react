import type { LogoMarqueeProps } from '@/infrastructure/ui/carousel/types';
import styles from './LogoMarquee.module.css';

export default function LogoMarquee({ items }: LogoMarqueeProps) {
  return (
    <div className={styles.carousel}>
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className={styles.group}
            aria-hidden={copy === 1 ? 'true' : undefined}
          >
            {items.map((item) => (
              <div key={item.name} className={styles.item}>
                <img src={item.src} alt={item.name} loading="lazy" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
