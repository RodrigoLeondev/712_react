import type { ContactField } from '@/domain/contact/types';

export const contactFields: readonly ContactField[] = [
  {
    id: 'nombre',
    label: 'Nombre',
    placeholder: 'Tu nombre',
    type: 'text',
    half: true,
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'tucorreo@empresa.com',
    type: 'email',
    half: true,
  },
  {
    id: 'empresa',
    label: 'Empresa',
    placeholder: 'Nombre de tu empresa',
    type: 'text',
  },
  {
    id: 'subject',
    label: 'Subject',
    placeholder: '¿De qué se trata tu proyecto?',
    type: 'text',
  },
  {
    id: 'message',
    label: 'Message',
    placeholder: 'Cuéntanos los detalles',
    multiline: true,
  },
];
