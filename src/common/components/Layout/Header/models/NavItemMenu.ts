export interface INavItemMenu {
  i18Key: string;
  href?: string;
  key: string;
  subMenuItems?: Omit<INavItemMenu, 'children'>[];
}
