import styles from './BaseLayout.module.css';
import type { BaseLayoutProps } from './types';

/**
 * Esqueleto de página con fondo oscuro (--color-dark, #141414).
 * No conoce ningún dominio: recibe header y footer como slots para
 * respetar la regla infrastructure ↛ domain.
 */
export default function BaseLayout({ children, header, footer }: BaseLayoutProps) {
  return (
    <div className={styles.layout}>
      {header}
      <main className={styles.main}>{children}</main>
      {footer}
    </div>
  );
}
