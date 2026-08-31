import type { TitleProps } from '@/infrastructure/ui/text/types';
import styles from './Title.module.css';

export default function Title({ title, highlight }: TitleProps) {
    return(
        <h1 className={styles.title}>
            <span className={styles.line}>{title}</span>
            {highlight && <span className={styles.highlight}>{highlight}</span>}
        </h1>
    )
}
