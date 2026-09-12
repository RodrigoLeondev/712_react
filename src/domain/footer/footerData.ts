import type { FooterLink, SocialLink } from '@/domain/footer/types';

export const footerLinks: readonly FooterLink[] = [
  { id: 'home', label: 'Inicio', href: '#hero' },
  { id: 'privacy', label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
  { id: 'call', label: 'Agendar llamada', href: '#contacto' },
];

export const socialLinks: readonly SocialLink[] = [
  { id: 'x', label: 'X', href: 'https://x.com' },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
];

export const FOOTER_ADDRESS = 'Arquimedes 130 Piso 5 Of B';
export const FOOTER_LEGAL = '@2026 712Studio. All Rights Reserved';
