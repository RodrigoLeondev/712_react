import TagPill from '@/infrastructure/ui/pill/TagPill';
import styles from './StackedCard.module.css';

export default function StackedCard(){
  return (
    <div className={styles.container}>
      {/* El grupo de tarjetas apiladas */}
      <div className={styles.stack}>
        <h2 className={styles.title}>
          <span className={styles.firstWord}>
            <span className={styles.cornerPill}>
              <TagPill label="Como trabajamos" tone="purple" tilt={-20} />
            </span>
            DESDE
          </span>{' '}
          LA IDEA HASTA LA ENTREGA
        </h2>

        <div className={styles.textBox}>
          <p>
            Entendemos tu contexto y tomamos decisiones creativas alineadas a tus objetivos. Diseñamos experiencias digitales que conectan con tu audiencia y
          </p>
        </div>

        {/* Decoración de estrella en la esquina */}
        <div className={styles.sparkle}>✦</div>
      </div>
    </div>
  );
}
