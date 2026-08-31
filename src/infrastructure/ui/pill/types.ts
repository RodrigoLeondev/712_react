export type PillTone =
  | 'green'
  | 'purple'
  | 'gold'
  | 'rose'
  | 'redOrange'
  | 'white';

export interface PillItem {
  label: string;
  tone?: PillTone;
  tilt?: number;
  size?: 'sm' | 'md' | 'lg';
}

export type TagPillProps = PillItem;

export interface PillGroupProps {
  pills: PillItem[];
}
