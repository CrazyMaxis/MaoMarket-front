import { Trans, useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import dayjs from 'dayjs';
import styles from './index.module.scss';

const Footer = () => {
  const { t } = useTranslation('layout', { keyPrefix: 'footer' });

  const currentYear = dayjs().year();

  return (
    <footer className={styles.root}>
      <Flex className={styles.footerContent} gap={18} vertical>
        <div className={styles.contactBlock}>
          <p className={styles.title}>{t('contacts.title')}</p>
          <p>
            <Trans
              t={t}
              defaults={'contacts.mainInfo'}
              components={{ br: <br /> }}
            />
          </p>
        </div>
        <Flex
          justify="space-between"
          align="center"
          className={styles.copyright}
          gap={6}
          wrap
        >
          <p className={styles.copyright}>{t('copyright', { currentYear })}</p>
        </Flex>
      </Flex>
    </footer>
  );
};

export default Footer;
