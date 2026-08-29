/**
 * Paleta del sitio en JS.
 *
 * Para estilar componentes usa las variables CSS de
 * `infrastructure/styles/globals.css` (--color-*). Este módulo existe para
 * los casos en que el color debe llegar a JavaScript: shaders WebGL,
 * canvas, o props de color de un componente.
 */
export const COLORS = {
  primary: '#1A1A2E',
  secondary: '#16213E',
  accent: '#E94560',
  gold: '#F5A623',
  light: '#F5F5F5',
  white: '#f4f3f2',
  dark: '#141414',
  green: '#d5ea50',
  redOrange: '#fd1417',
  purple: '#5614e8',
  rose: '#f55cf5',
} as const;
