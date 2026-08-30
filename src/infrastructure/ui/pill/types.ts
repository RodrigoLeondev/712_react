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
  /** Inclinación en grados; negativo a la izquierda, positivo a la derecha. */
  tilt?: number;
}

export type TagPillProps = PillItem;

export interface PillGroupProps {
  pills: PillItem[];
}
