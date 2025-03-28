import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Flex } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface ITab {
  i18key: string;
  url: string;
  activeTabKey?: string;
}

export interface ITabsProps {
  tabs: ITab[];
  instance: string;
  onClickItem?: (item: ITab) => void;
}

export const Tabs = ({ tabs, instance, onClickItem }: ITabsProps) => {
  const { t } = useTranslation(instance);
  return (
    <Flex className={styles.tabWrapper}>
      {tabs.map((item) => (
        <NavLink
          onClick={() => onClickItem?.(item)}
          key={item.i18key}
          to={item.url}
          className={({ isActive }) =>
            classNames(styles.tabItem, { [styles.active]: isActive })
          }
        >
          {t(item.i18key)}
        </NavLink>
      ))}
    </Flex>
  );
};
