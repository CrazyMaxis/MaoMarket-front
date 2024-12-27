import { PropsWithChildren, ReactNode } from 'react';
import { Flex } from 'antd';
import useScreenWidthSize from 'hooks/useScreenWidthSize';
import BurgerNavList from '../Layout/Header/components/NavMenu/components/BurgerNavList';
import { Spinner } from '../Spinner';
import styles from './index.module.scss';

interface ICommunicationHeaderProps extends PropsWithChildren {
  title: ReactNode;
  buttons?: ReactNode;
  isLoading?: boolean;
}

export const CommunicationHeader = ({
  title,
  children,
  buttons,
  isLoading,
}: ICommunicationHeaderProps) => {
  const { screenWidth } = useScreenWidthSize();

  const showBurger = screenWidth < 1220;

  return (
    <Flex align="center" className={styles.root} vertical>
      <Flex gap={16} align="center" className={styles.headerContent} vertical>
        <Flex
          align="center"
          justify="space-between"
          className={styles.headerBlock}
        >
          <Flex className={styles.blockTitle} align="center" gap={30}>
            {showBurger && <BurgerNavList />}
            <div className={styles.title}>{title}</div>
          </Flex>
          <div>{buttons}</div>
        </Flex>
      </Flex>
      <Flex className={styles.content}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.children}>{children}</div>
        )}
      </Flex>
    </Flex>
  );
};
