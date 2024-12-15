import { PropsWithChildren } from 'react';
import { Flex } from 'antd';
import classNames from 'classnames';
import { Feather } from '../../Feather';
import styles from './index.module.scss';

export const HeaderCell = ({
  children,
  ...props
}: PropsWithChildren<React.TdHTMLAttributes<HTMLTableCellElement>>) => {
  if (
    props.className?.includes('ant-table-selection-column') ||
    !('order' in props)
  ) {
    return <th>{children}</th>;
  }

  return (
    <th {...props}>
      <Flex
        align="center"
        justify="space-between"
        className={styles.headerCell}
      >
        {children}
        <Feather
          className={classNames(styles.sortIcon, {
            [styles.arrowsIcon]: !props.order,
          })}
          type={
            props.order === 'ASC'
              ? 'arrowUp'
              : props.order === 'DESC'
                ? 'arrowDown'
                : 'tableArrows'
          }
        />
      </Flex>
    </th>
  );
};
