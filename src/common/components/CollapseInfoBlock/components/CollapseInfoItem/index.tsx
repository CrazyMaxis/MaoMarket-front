import { ReactNode } from 'react';
import { Flex } from 'antd';
import styles from './index.module.scss';

interface IInformationItemProps {
  title: ReactNode;
  value: ReactNode;
}

export const CollapseInfoItem = ({ title, value }: IInformationItemProps) => {
  return (
    <Flex align="center" gap={4} className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div>{value}</div>
    </Flex>
  );
};
