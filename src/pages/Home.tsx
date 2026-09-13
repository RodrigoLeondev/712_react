import Nav from '@/domain/navigation/Nav';
import HeroContent from '@/domain/showcase/HeroContent';
import HeroVideo from '@/domain/showcase/HeroVideo';
import Services from '@/domain/services/Services';
import About from '@/domain/about/About';
import Collaborate from '@/domain/services/Collaborate';
import Contact from '@/domain/contact/Contact';
import Footer from '@/domain/footer/Footer';
import BaseLayout from '@/infrastructure/layouts/BaseLayout/BaseLayout';
import { HERO } from '@/infrastructure/lib/constants/hero';
import styles from './Home.module.css';
import Title from '@/infrastructure/ui/text/Title';

export default function Home() {
  return (
    <BaseLayout header={<Nav />} footer={<Footer />}>
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
      <section id="about" className={styles.about}>
        <About />
      </section>
      <section id="colaborar" className={styles.collaborate}>
        <Collaborate />
      </section>
      <section id="contacto" className={styles.contact}>
        <Contact />
      </section>
    </BaseLayout>
  );
}
