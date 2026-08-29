import type { ReactNode } from 'react';

export interface BaseLayoutProps {
  children: ReactNode;
  /** Slots de composición: la página decide qué navegación y pie inyecta. */
  header?: ReactNode;
  footer?: ReactNode;
}
