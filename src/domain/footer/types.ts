export type SocialName = 'x' | 'facebook' | 'linkedin';

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: SocialName;
  label: string;
  href: string;
}

export interface SocialIconProps {
  name: SocialName;
}
