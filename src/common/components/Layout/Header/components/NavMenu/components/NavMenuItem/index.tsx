import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { INavItemMenu } from '../../../../models/NavItemMenu';
import BurgerMenuCollapse from './components/BurgerItemCollapse';
import DropdownItem from './components/DropdownItem';
import styles from './index.module.scss';

interface INavMenuItemProps {
  navMenuItem: INavItemMenu;
  burgerProps?: {
    onClickItem: () => void;
    activeKey: string;
    setActiveKey: Dispatch<SetStateAction<string>>;
  };
}

const NavMenuItem = ({ navMenuItem, burgerProps }: INavMenuItemProps) => {
  const { t } = useTranslation('layout', { keyPrefix: 'navMenu' });

  const renderItem = () => {
    if (!navMenuItem?.subMenuItems) {
      return (
        <Link className={styles.linkButton} to={navMenuItem.href!}>
          {t(`items.${navMenuItem.i18Key}`)}
        </Link>
      );
    }
    if (burgerProps) {
      return <BurgerMenuCollapse navMenuItem={navMenuItem} {...burgerProps} />;
    }
    return <DropdownItem navMenuItem={navMenuItem} />;
  };

  return <>{renderItem()}</>;
};

export default NavMenuItem;
