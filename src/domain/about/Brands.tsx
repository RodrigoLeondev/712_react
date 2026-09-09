import TagPill from '@/infrastructure/ui/pill/TagPill';
import LogoMarquee from '@/infrastructure/ui/carousel/LogoMarquee';
import { brands } from '@/domain/about/brandsData';
import styles from './Brands.module.css';

export default function Brands() {
  return (
    <section className={styles.brands}>
      <h2 className={styles.title}>
        <span className={styles.firstWord}>
          <span className={styles.cornerPill}>
            <TagPill label="Algunas ✦" tone="purple" tilt={-20} />
          </span>
          Marcas
        </span>{' '}
        que han confiado en nosotros
      </h2>
      <LogoMarquee items={brands} />
    </section>
  );
}
