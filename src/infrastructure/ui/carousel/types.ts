export interface LogoMarqueeItem {
  name: string;
  src: string;
}

export interface LogoMarqueeProps {
  items: readonly LogoMarqueeItem[];
}
