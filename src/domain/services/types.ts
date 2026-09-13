import type { PillItem } from '@/infrastructure/ui/pill/types';

export interface Service {
  title: string;
  content: string;
  pills: PillItem[];
}

export interface DeckCardData {
  id: string;
  title: string;
  text: string;
}

export interface DeckCardProps extends DeckCardData {
  depth: number;
}

export interface CardDeckProps {
  items: readonly DeckCardData[];
}
