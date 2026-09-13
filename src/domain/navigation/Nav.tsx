import { useScroll } from '@/infrastructure/lib/hooks/useScroll';
import styles from './Nav.module.css';

export default function Nav() {
  const scrolled = useScroll();

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.logo}>
            <a href="#hero"><img src="/Logo.svg" alt="Logo" /></a>
        </div>
        <div className={styles.menu}>
            <ul className={styles.menuList}>
                <li><a href="#hero">Inicio</a></li>
                <li><a href="#services">Servicios</a></li>
                <li><a href="#about">Sobre nosotros</a></li>
                <li><a href="#colaborar">Colaborar</a></li>
            </ul>
        </div>
        <div className={styles.contactButton}>
            <a href="#contacto">Contacto</a>
        </div>
    </nav>
  );
}
