import type { ReactNode } from 'react';

export interface CardServiceProps {
  title: string;
  text: string;
  children?: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}
