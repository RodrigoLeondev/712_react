import type { PillItem } from '@/infrastructure/ui/pill/types';

/** Card activa: la única que lleva contenido real. */
export interface AboutCardProps {
  title: string;
  text: string;
  pills: PillItem[];
}

/** Capas de atrás: puramente decorativas, sin contenido. */
export interface CardLayersProps {
  /** Cuántas capas se dibujan detrás de la card activa. */
  count?: number;
}

export interface StackedCardProps extends AboutCardProps {
  layers?: number;
}
