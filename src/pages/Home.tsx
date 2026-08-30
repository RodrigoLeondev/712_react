import Nav from '@/domain/navigation/Nav';
import HeroContent from '@/domain/showcase/HeroContent';
import HeroVideo from '@/domain/showcase/HeroVideo';
import Services from '@/domain/services/Services';
import BaseLayout from '@/infrastructure/layouts/BaseLayout/BaseLayout';
import { HERO } from '@/infrastructure/lib/constants/hero';
import styles from './Home.module.css';
import Title from '@/infrastructure/ui/text/Title';

/**
 * La página orquesta: compone el layout de infraestructura con las
 * secciones de domain/ y les inyecta los datos.
 */
export default function Home() {
  return (
    <BaseLayout header={<Nav />}>
      <section id="hero" className={styles.hero}>
        <div className={styles.heroInner}>
          <HeroContent badgeText={HERO.badgeText} title={HERO.title} />
        </div>
        <HeroVideo videoUrl={HERO.videoUrl} />
      </section>
      <section id="services" className={styles.services}>
        <Title title="Servicios" />
        <div className={styles.servicesInner}>
         <Services /> 
        </div>
      </section>
    </BaseLayout>
  );
}
