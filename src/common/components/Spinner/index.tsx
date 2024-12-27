import { useTranslation } from 'react-i18next';
import { Flex, Spin } from 'antd';
import styles from './index.module.scss';

export const Spinner = () => {
  const { t } = useTranslation();

  return (
    <Flex align="center" justify="center" className={styles.root}>
      <div className={styles.spin}>
        <Spin size="large" tip={t('loading')}>
          <div />
        </Spin>
      </div>
    </Flex>
  );
};
