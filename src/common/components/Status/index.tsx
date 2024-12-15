import { ReactNode } from 'react';
import { Flex } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface IStatusProps {
  type?: 'default' | 'ghost' | 'success' | 'error' | 'progress' | 'attention';
  icon?: ReactNode;
  children: ReactNode;
}

export const Status = ({ type = 'default', icon, children }: IStatusProps) => {
  return (
    <Flex gap={8} className={classNames(styles.root, styles[type])}>
      {icon && icon}
      {children}
    </Flex>
  );
};
