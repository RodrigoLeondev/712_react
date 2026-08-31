export interface CollapseItemData {
  id: string;
  title: string;
  accent?: string;
  text: string;
}

export interface CollapseItemProps extends CollapseItemData {
  isOpen: boolean;
  onToggle: () => void;
}
