import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';
import { INavItemMenu } from 'src/common/components/Layout/Header/models/NavItemMenu';
import { Button, Feather } from 'components';
import stylesLink from '../../index.module.scss';
import styles from './index.module.scss';

interface IDropdownItemProps {
  navMenuItem: INavItemMenu;
}

const DropdownItem = ({ navMenuItem }: IDropdownItemProps) => {
  const { t } = useTranslation('layout', { keyPrefix: 'navMenu' });

  return (
    <Dropdown
      placement="bottomLeft"
      trigger={['click']}
      dropdownRender={(menu) => <div className={styles.subMenu}>{menu}</div>}
      menu={{
        items: navMenuItem.subMenuItems?.map((item) => ({
          label: <Link to={item.href!}>{t(`items.${item.i18Key}`)}</Link>,
          key: item.key,
        })),
      }}
      autoAdjustOverflow={false}
      destroyPopupOnHide
    >
      <div>
        <Button
          className={stylesLink.linkButton}
          icon={<Feather type="arrowDown" />}
          iconPosition="end"
          type="link"
        >
          {t(`items.${navMenuItem.i18Key}`)}
        </Button>
      </div>
    </Dropdown>
  );
};

export default DropdownItem;
