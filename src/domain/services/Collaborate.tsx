import TagPill from '@/infrastructure/ui/pill/TagPill';
import CardDeck from '@/domain/services/CardDeck';
import { collaborateDeck } from '@/domain/services/deckData';
import styles from './Collaborate.module.css';

export default function Collaborate() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.pill}>
          <TagPill label="Maneras de colaborar" tone="green" tilt={-4} />
        </div>

        <h2 className={styles.title}>
          <span className={styles.lineOne}>En</span>
          <span className={styles.lineTwo}>Donde necesites</span>
        </h2>

        <p className={styles.lead}>
          Operamos como una extensión de tu equipo: nos adaptamos a tu entorno,
          optimizamos tiempos sin sacrificar calidad y nos integramos en la etapa
          del proyecto donde nos necesites.
        </p>
      </header>

      <div className={styles.showcase}>
        <div className={styles.visual}>
          <img
            src="/animations/multitask.svg"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        </div>

        <CardDeck items={collaborateDeck} />
      </div>
    </>
  );
}
