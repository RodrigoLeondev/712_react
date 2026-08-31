import { useState } from 'react';
import { collapseItems } from '@/domain/about/collapseData';
import CollapseItem from './CollapseItem';
import styles from './CollapseStack.module.css';

export default function CollapseStack() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {collapseItems.map((item, i) => (
          <CollapseItem
            key={item.id}
            {...item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
