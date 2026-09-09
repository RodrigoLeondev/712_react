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
              <TagPill label={'Como\ntrabajamos'} tone="purple" tilt={-20} wrap />
            </span>
            DESDE
          </span>{' '}
          LA IDEA 
        </h2>
        <span/>
        <h2 className={styles.title2}>HASTA LA ENTREGA</h2>

        <div className={styles.textBox}>
          <p>Entendemos tu contexto y tomamos decisiones creativas alineadas a tus objetivos.</p>
        </div>

        {/* Decoración de estrella en la esquina */}
        <div className={styles.sparkle}>✦</div>
      </div>
    </div>
  );
}
