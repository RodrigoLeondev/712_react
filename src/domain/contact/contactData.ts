import type { ContactField } from '@/domain/contact/types';

export const contactFields: readonly ContactField[] = [
  {
    id: 'nombre',
    label: 'Nombre',
    placeholder: 'Tu nombre',
    type: 'text',
    half: true,
    required: true,
    maxLength: 80,
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'tucorreo@empresa.com',
    type: 'email',
    half: true,
    required: true,
    maxLength: 120,
  },
  {
    id: 'empresa',
    label: 'Empresa',
    placeholder: 'Nombre de tu empresa',
    type: 'text',
    maxLength: 80,
  },
  {
    id: 'subject',
    label: 'Subject',
    placeholder: '¿De qué se trata tu proyecto?',
    type: 'text',
    required: true,
    maxLength: 120,
  },
  {
    id: 'message',
    label: 'Message',
    placeholder: 'Cuéntanos los detalles',
    multiline: true,
    required: true,
    maxLength: 2000,
  },
];
