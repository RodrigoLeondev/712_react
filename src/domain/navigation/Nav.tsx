import { useScroll } from '@/infrastructure/lib/hooks/useScroll';
import styles from './Nav.module.css';

export default function Nav() {
  const scrolled = useScroll();

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.logo}>
            <img src="/Logo.svg" alt="Logo" style={{ display: 'block', width: 120 }} />        </div>
        <div className={styles.menu}>
            <ul className={styles.menuList}>
                <li><a href="/">Inicio</a></li>
                <li><a href="/services">Servicios</a></li>
                <li><a href="/about">Sobre nosotros</a></li>
                <li><a href="/contact">Contacto</a></li>
            </ul>
        </div>
        <div className={styles.contactButton}>
            <button>Contacto</button>
        </div>
    </nav>
  );
}