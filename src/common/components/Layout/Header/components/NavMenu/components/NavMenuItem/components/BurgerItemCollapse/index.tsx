import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Flex } from 'antd';
import { INavItemMenu } from 'src/common/components/Layout/Header/models/NavItemMenu';
import { Collapse } from 'components';
import styles from './index.module.scss';

interface IBurgerItemCollapseProps {
  navMenuItem: INavItemMenu;
  onClickItem: () => void;
  activeKey: string;
  setActiveKey: Dispatch<SetStateAction<string>>;
}

const BurgerItemCollapse = ({
  navMenuItem,
  onClickItem,
  activeKey,
  setActiveKey,
}: IBurgerItemCollapseProps) => {
  const { t } = useTranslation('layout', { keyPrefix: 'navMenu' });

  return (
    <Collapse
      className={styles.collapseNav}
      activeKey={activeKey}
      items={[
        {
          label: t(`items.${navMenuItem.i18Key}`),
          onClick: () =>
            setActiveKey((prev) =>
              prev === navMenuItem.key ? '' : navMenuItem.key,
            ),
          children: (
            <Flex vertical>
              {navMenuItem.subMenuItems?.map((item) => (
                <Link
                  className={styles.collapseLinkButton}
                  to={item.href!}
                  onClick={onClickItem}
                  key={item.key}
                >
                  {t(`items.${item.i18Key}`)}
                </Link>
              ))}
            </Flex>
          ),
          key: navMenuItem.key,
        },
      ]}
      destroyInactivePanel
    />
  );
};

export default BurgerItemCollapse;
