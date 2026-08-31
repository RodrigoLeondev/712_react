import { useId } from 'react';
import type { CardServiceProps } from '@/infrastructure/ui/card/types';
import styles from './CardService.module.css';

export default function CardService({ title, text, children, isOpen, onToggle }: CardServiceProps) {
    const contentId = useId();

    return(
        <div className={`${styles.acordionCard} ${isOpen ? styles.isOpen : ''}`}>
            <h3 className={styles.acordionTitle}>
                <button
                    type="button"
                    className={styles.acordionToggle}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={onToggle}
                >
                    {title}
                    <span className={styles.acordionIcon} aria-hidden="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line className={styles.horizontalLine} x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </span>
                </button>
            </h3>
            <div id={contentId} className={styles.acordionContent} aria-hidden={!isOpen}>
                <div>
                    <p>{text}</p>
                    {children}
                </div>
            </div>
        </div>
    )
}
