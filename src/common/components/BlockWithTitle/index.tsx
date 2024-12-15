import { PropsWithChildren, ReactNode } from 'react';
import { Flex } from 'antd';
import styles from './index.module.scss';

interface IBlockWithTitleProps extends PropsWithChildren {
  title: ReactNode;
}

export const BlockWithTitle = ({ children, title }: IBlockWithTitleProps) => {
  return (
    <Flex gap={16} vertical>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </Flex>
  );
};
