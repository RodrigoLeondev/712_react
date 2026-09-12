import type { SocialIconProps } from '@/domain/footer/types';

const paths: Record<SocialIconProps['name'], string> = {
  x: 'M3.1 3h5.6l4.2 5.6L18 3h2.4l-6.3 7 6.9 11h-5.6l-4.4-6.4L5.4 21H3l7-7.8L3.1 3Z',
  facebook:
    'M17.4 3.8v3.2h-1.9c-.8 0-1.3.5-1.3 1.4v2.2h3.1l-.5 3.3h-2.6V22h-3.5v-8.1H8.4v-3.3h2.3V8.2c0-2.7 1.6-4.4 4.3-4.4h2.4Z',
  linkedin:
    'M6.2 21.5H2.4V9.1h3.8v12.4ZM4.3 7.4a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6Zm17.3 14.1h-3.8V15c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.8.8-2.1 1.5-.1.3-.1.6-.1 1v6.8H9.7V9.1h3.8v1.7c.5-.8 1.4-1.9 3.5-1.9 2.6 0 4.4 1.7 4.4 5.3v7.3Z',
};

export default function SocialIcon({ name }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d={paths[name]} fill="currentColor" />
    </svg>
  );
}
