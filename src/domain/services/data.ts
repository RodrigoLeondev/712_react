import type { Service } from '@/domain/services/types';

export const dataServices: Service[] = [
  {
    title: 'END TO END',
    content:
      'Configuramos equipos de producción a la medida de cada proyecto, sin importar su tamaño. Producimos y grabamos contenido digital, campañas, comerciales y comunicación corporativa, con el formato y las salidas que cada plataforma requiere.',
    pills: [
        { label: 'Preproducción', tone: 'purple', tilt: -3 },
        { label: 'Producción', tone: 'purple', tilt: 2 },
        { label: 'Postproducción', tone: 'purple', tilt: -1.5 },
        { label: 'Dir. creativa', tone: 'white', tilt: 3 },
        { label: 'Conceptualización', tone: 'white', tilt: -2 },
        { label: 'Edición', tone: 'white', tilt: 1.5 },
        { label: 'Dirección', tone: 'white', tilt: 1.5 },
        { label: 'Guión', tone: 'white', tilt: 1.5 },
        { label: 'Grabación', tone: 'white', tilt: -1.5 },
        { label: 'C.de color', tone: 'white', tilt: 3.5 },
        { label: 'Dirección', tone: 'white', tilt: -4.5 },
        { label: 'Fotografía', tone: 'white', tilt: 1.5 },
    ],
  },
  {
    title: 'CONTENIDO UGG',
    content:
      'Conceptualización y producción de contenido white label para uso en redes sociales de marca, dirección creativa y consistencia narrativa entre las piezas de un mismo concepto.',
    pills: [
      { label: 'Branding', tone: 'green', tilt: -2.5 },
      { label: 'Social', tone: 'white', tilt: 2 },
      { label: 'Narrativa', tone: 'gold', tilt: -1 },
    ],
  },
  {
    title: 'ANIMACIÓN Y DISEÑO',
    content:
      'Resolvemos las piezas gráficas y animadas con el mismo criterio visual y técnico, sin importar el volumen ni la plataforma de destino.',
    pills: [
      { label: 'Motion', tone: 'gold', tilt: 3 },
      { label: 'Diseño', tone: 'white', tilt: -2 },
      { label: 'Animación', tone: 'purple', tilt: 1.5 },
      { label: 'Ilustración', tone: 'white', tilt: -3 },
    ],
  },
  {
    title: '3D EN PRODUCTO',
    content:
      'Piezas en 3D enfocadas a producto, packaging y ambientes con acabado fotorrealista, listas para campaña o e-commerce.',
    pills: [
      { label: '3D', tone: 'purple', tilt: -2 },
      { label: 'Packaging', tone: 'white', tilt: 2.5 },
      { label: 'Render', tone: 'rose', tilt: -1.5 },
    ],
  },
];
