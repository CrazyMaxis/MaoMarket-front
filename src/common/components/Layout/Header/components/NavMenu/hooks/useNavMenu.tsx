import { INavItemMenu } from '../../../models/NavItemMenu';

const useNavMenu = () => {
  /* TODO: change elements after formulating requirements from BA */
  const items: INavItemMenu[] = [
    { i18Key: 'news', href: 'news', key: 'news' },
    { i18Key: 'advertisements', href: 'advertisements', key: 'advertisements' },
    { i18Key: 'aboutUs', href: 'aboutUs', key: 'aboutUs' },
    {
      i18Key: 'administrationPanel',
      href: `administrationPanel`,
      key: 'administrationPanel',
    },
  ];

  return { items };
};

export default useNavMenu;
