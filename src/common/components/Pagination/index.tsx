import { Pagination as AntdPagination, PaginationProps } from 'antd';
import { Button, Feather } from 'components';
import styles from './index.module.scss';

export const Pagination = ({ ...props }: PaginationProps) => {
  const renderButton = (type: 'prev' | 'next') => (
    <Button type="text" className={styles.arrowButtonStyle}>
      <Feather type={type === 'prev' ? 'arrowLeft' : 'arrowRight'} />
    </Button>
  );

  return (
    <AntdPagination
      className={styles.pagination}
      align="start"
      showSizeChanger={false}
      showTitle={false}
      hideOnSinglePage
      itemRender={(_, type, originalElement) =>
        type === 'prev' || type === 'next'
          ? renderButton(type)
          : originalElement
      }
      {...props}
    />
  );
};
