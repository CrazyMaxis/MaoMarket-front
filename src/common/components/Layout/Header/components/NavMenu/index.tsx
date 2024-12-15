import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import { Button, Feather } from 'components';
import NavList from './components/NavList';
import styles from './index.module.scss';

const NavMenu = () => {
  const { t } = useTranslation('layout', { keyPrefix: 'navMenu' });

  return (
    <nav className={styles.root}>
      <Flex
        align="center"
        justify="space-between"
        className={styles.navContent}
      >
        <NavList />
        {false && (
          <Button icon={<Feather type="pencil" />}>{t('enroll')}</Button>
        )}
      </Flex>
    </nav>
  );
};

export default NavMenu;
