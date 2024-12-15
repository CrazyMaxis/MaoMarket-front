import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Flex } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface ITab {
  i18key: string;
  url: string;
}

interface ITabs {
  tabs: ITab[];
  instance: string;
}

export const Tabs = ({ tabs, instance }: ITabs) => {
  const { t } = useTranslation(instance);
  return (
    <Flex className={styles.tabWrapper}>
      {tabs.map((item) => (
        <NavLink
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
