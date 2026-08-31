import type { CSSProperties } from 'react';
import type { TagPillProps } from '@/infrastructure/ui/pill/types';
import styles from './TagPill.module.css';

export default function TagPill({
  label,
  tone = 'white',
  tilt,
  size = 'md',
}: TagPillProps) {
  return (
    <span
      className={[styles.pill, styles[tone], styles[size]]
        .filter(Boolean)
        .join(' ')}
      style={
        tilt !== undefined
          ? ({ '--pill-tilt': `${tilt}deg` } as CSSProperties)
          : undefined
      }
    >
      {label}
    </span>
  );
}
