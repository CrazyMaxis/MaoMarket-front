import { Roles } from 'enums/Roles';
import { useAppSelector } from 'hooks/customReduxHooks';
import { INavItemMenu } from '../../../models/NavItemMenu';

const useNavMenu = () => {
  const userRole = useAppSelector((state) => state.auth.user?.role);

  const items: INavItemMenu[] = [
    { i18Key: 'news', href: 'news', key: 'news' },
    { i18Key: 'advertisements', href: 'advertisements', key: 'advertisements' },
  ];

  if (userRole === Roles.ADMINISTRATOR || userRole === Roles.MODERATOR) {
    items.push({
      i18Key: 'administrationPanel',
      href: `administrationPanel/assignRoles`,
      key: 'administrationPanel',
    });
  }

  return { items };
};

export default useNavMenu;
