import { useTranslation } from 'react-i18next';
import { Flex, Table as AntdTable, TableProps } from 'antd';
import classNames from 'classnames';
import { HeaderCell } from './HeaderCell';
import { useSort } from './hooks/useSort';
import styles from './index.module.scss';

export interface ITableProps extends TableProps {
  isSelecting?: boolean;
  sortColumns?: string[];
}

export const Table = ({
  isSelecting = true,
  sortColumns,
  columns,
  ...props
}: ITableProps) => {
  const { t } = useTranslation('common');

  const { modifyColumns } = useSort({ sortColumns });

  return (
    <div
      className={classNames(styles.tableWrapper, {
        [styles.tableLoadingBackground]: props.loading,
      })}
    >
      <AntdTable
        size="small"
        className={styles.table}
        columns={modifyColumns(columns)}
        rowSelection={
          isSelecting ? { type: 'checkbox', ...props.rowSelection } : undefined
        }
        pagination={{
          showTotal: (total, range) => (
            <Flex className={styles.paginationInfo}>
              {t('paginationRange', { start: range[0], end: range[1], total })}
            </Flex>
          ),
          hideOnSinglePage: true,
          ...props.pagination,
        }}
        components={{
          header: {
            cell: HeaderCell,
          },
        }}
        {...props}
      />
    </div>
  );
};
