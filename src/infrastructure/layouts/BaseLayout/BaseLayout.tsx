import styles from './BaseLayout.module.css';
import type { BaseLayoutProps } from './types';

export default function BaseLayout({ children, header, footer }: BaseLayoutProps) {
  return (
    <div className={styles.layout}>
      {header}
      <main className={styles.main}>{children}</main>
      {footer}
    </div>
  );
}
