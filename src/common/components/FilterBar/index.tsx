import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Row } from 'antd';
import { Button, Feather, Tooltip } from 'components';
import styles from './index.module.scss';

interface IFilterBar {
  onReset: () => void;
  children: ReactNode;
}

export const FilterBar = ({ onReset, children }: IFilterBar) => {
  const { t } = useTranslation('common');

  return (
    <Flex gap={32} className={styles.root}>
      <Row gutter={[16, 10]} className={styles.formWrapper}>
        {children}
      </Row>
      <Tooltip title={t('resetFilters')}>
        <Button
          onClick={onReset}
          icon={<Feather type="reset" />}
          className={styles.reset}
        />
      </Tooltip>
    </Flex>
  );
};
