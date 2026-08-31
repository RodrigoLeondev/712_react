import type { PillGroupProps } from '@/infrastructure/ui/pill/types';
import TagPill from './TagPill';
import styles from './PillGroup.module.css';

export default function PillGroup({ pills }: PillGroupProps) {
  return (
    <div className={styles.group}>
      {pills.map((pill) => (
        <TagPill
          key={pill.label}
          label={pill.label}
          tone={pill.tone}
          tilt={pill.tilt}
        />
      ))}
    </div>
  );
}
