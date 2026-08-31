import { useState } from 'react';
import { dataServices } from '@/domain/services/data';
import CardService from '@/infrastructure/ui/card/CardService';
import PillGroup from '@/infrastructure/ui/pill/PillGroup';
import styles from './Services.module.css';

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.list}>
      {dataServices.map((service, i) => (
        <CardService
          key={service.title}
          title={service.title}
          text={service.content}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <PillGroup pills={service.pills} />
        </CardService>
      ))}
    </div>
  );
}
