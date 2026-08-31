import type { ReactNode } from 'react';

export interface CardServiceProps {
  title: string;
  text: string;
  children?: ReactNode;
  /** La apertura la controla el padre: solo una tarjeta abierta a la vez. */
  isOpen: boolean;
  onToggle: () => void;
}
