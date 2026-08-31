/** Destacados de color aplicables a una palabra del titular. */
export type HighlightKey = 'green' | 'redOrange' | 'rose';

export interface HeroContentProps {
  badgeText?: string;
  title: string;
}

export interface HeroVideoProps {
  videoUrl: string;
}
