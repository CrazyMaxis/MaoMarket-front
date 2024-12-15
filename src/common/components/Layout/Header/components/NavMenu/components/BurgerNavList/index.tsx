import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownProps, MenuProps } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Button, Feather } from 'components';
import useNavMenu from '../../hooks/useNavMenu';
import NavMenuItem from '../NavMenuItem';
import styles from './index.module.scss';

const BurgerNavList = () => {
  const { items } = useNavMenu();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('');
  const { t } = useTranslation('layout', { keyPrefix: 'navMenu' });

  const handleMenuClick: MenuProps['onClick'] = (e: MenuInfo) => {
    if (!e.key.includes('submenu')) {
      setIsOpen(false);
    }
  };

  const onOpenChange: DropdownProps['onOpenChange'] = (
    open: boolean,
    info: {
      source: 'trigger' | 'menu';
    },
  ) => {
    if (info.source === 'trigger' || open) {
      setIsOpen(open);
      setActiveKey('');
    }
  };

  return (
    <Dropdown
      open={isOpen}
      onOpenChange={onOpenChange}
      placement="bottomLeft"
      trigger={['click']}
      align={{ offset: [-32, -40] }}
      dropdownRender={(menu) => (
        <div className={styles.subMenuBurger}>{menu}</div>
      )}
      menu={{
        items: [
          {
            label: (
              <Button type="link" className={styles.buttonBurger}>
                <Feather type={'burger'} />
              </Button>
            ),
            key: 'burger',
          },
          ...items.map((item) => ({
            label: (
              <NavMenuItem
                navMenuItem={item}
                burgerProps={{
                  onClickItem: () => setIsOpen(false),
                  activeKey: activeKey,
                  setActiveKey: setActiveKey,
                }}
                key={item.key}
              />
            ),
            key: !item.subMenuItems ? item.key : `submenu_${item.key}`,
          })),
          {
            label: (
              <Button icon={<Feather type="pencil" />}>{t('enroll')}</Button>
            ),
            key: 'actionButton',
          },
        ],
        onClick: handleMenuClick,
      }}
      destroyPopupOnHide
    >
      <div>
        <Button type="link" className={styles.buttonBurger}>
          <Feather type={'burger'} />
        </Button>
      </div>
    </Dropdown>
  );
};

export default BurgerNavList;
