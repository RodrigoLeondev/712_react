import { useId } from 'react';
import type { CollapseItemProps } from '@/domain/about/types';
import styles from './CollapseItem.module.css';

export default function CollapseItem({
  title,
  accent,
  text,
  isOpen,
  onToggle,
}: CollapseItemProps) {
  const contentId = useId();

  return (
    <div className={`${styles.item} ${isOpen ? styles.isOpen : ''}`}>
      <h3 className={styles.heading}>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
        >
          <span className={styles.title}>
            {title}
            {accent && <span className={styles.accent}> {accent}</span>}
          </span>

          <span className={styles.chevron} aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
      </h3>

      <div id={contentId} className={styles.content} aria-hidden={!isOpen}>
        <div>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </div>
  );
}
