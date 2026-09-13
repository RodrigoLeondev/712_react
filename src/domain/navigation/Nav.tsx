import { useEffect, useState } from 'react';
import { useScroll } from '@/infrastructure/lib/hooks/useScroll';
import { useBodyScrollLock } from '@/infrastructure/lib/hooks/useBodyScrollLock';
import styles from './Nav.module.css';
import type { NavLink } from './types';

const LINKS: readonly NavLink[] = [
  { href: '#hero', label: 'Inicio' },
  { href: '#services', label: 'Servicios' },
  { href: '#about', label: 'Sobre nosotros' },
  { href: '#colaborar', label: 'Colaborar' },
];

export default function Nav() {
  const scrolled = useScroll();
  const [open, setOpen] = useState(false);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <a href="#hero" onClick={close}>
          <img src="/Logo.svg" alt="Logo" width="120" height="26" />
        </a>
      </div>

      <div id="nav-menu" className={`${styles.menu} ${open ? styles.isOpen : ''}`}>
        <ul className={styles.menuList}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.menuContact}>
          <a href="#contacto" onClick={close}>
            Contacto
          </a>
        </div>
      </div>

      <div className={styles.contactButton}>
        <a href="#contacto">Contacto</a>
      </div>

      <button
        type="button"
        className={`${styles.burger} ${open ? styles.isOpen : ''}`}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
