export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  role?: string | undefined;
};

export type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};
