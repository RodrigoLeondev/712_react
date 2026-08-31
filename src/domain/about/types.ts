export interface CollapseItemData {
  id: string;
  title: string;
  accent?: string;
  text: string;
  subtitle?: string;
}

export interface CollapseItemProps extends CollapseItemData {
  isOpen: boolean;
  onToggle: () => void;
}
