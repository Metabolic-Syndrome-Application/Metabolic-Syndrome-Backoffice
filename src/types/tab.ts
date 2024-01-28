export interface TabConfig {
  id: number;
  icon?: JSX.Element;
  name: string;
  component: React.ReactNode;
}

export interface TabbedListProps {
  tabs: TabConfig[];
  listClassName?: string;
  panelClassName?: string;
}

export interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}
