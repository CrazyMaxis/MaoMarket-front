import { ReactNode } from 'react';
import { Flex } from 'antd';
import styles from './index.module.scss';

interface ITopBar {
  children: ReactNode;
}

export const TopBar = ({ children }: ITopBar) => {
  return (
    <Flex gap={16} className={styles.root}>
      {children}
    </Flex>
  );
};
