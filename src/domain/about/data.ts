import type { PillItem } from '@/infrastructure/ui/pill/types';

/** MARCADOR DE POSICIÓN: reescribir con el copy real. */
export const ABOUT_CARD = {
  title: 'Sobre nosotros',
  text: 'Texto descriptivo pendiente. Va en la columna izquierda de la card activa y admite un párrafo de varias líneas.',
  pills: [
    { label: 'Creatividad', tone: 'white', tilt: -3 },
    { label: 'Estrategia', tone: 'white', tilt: 2 },
    { label: 'Producción', tone: 'white', tilt: -1.5 },
  ] as PillItem[],
};
