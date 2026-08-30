import type { PillItem } from '@/infrastructure/ui/pill/types';

export interface Service {
  title: string;
  content: string;
  pills: PillItem[];
}
