import type { TitleProps } from '@/infrastructure/ui/text/types';
import styles from './Title.module.css';

export default function Title({ title, highlight, as: Tag = 'h2' }: TitleProps) {
  return (
    <Tag className={styles.title}>
      <span className={styles.line}>{title}</span>
      {highlight && <span className={styles.highlight}>{highlight}</span>}
    </Tag>
  );
}
