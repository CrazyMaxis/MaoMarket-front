import { Link } from 'react-router-dom';
import { Flex } from 'antd';
import { Feather } from 'components';
import { PATH } from 'routes/path';
import styles from './index.module.scss';

const HeaderLogo = () => {
  return (
    <Link to={PATH.HOME}>
      <Flex align="center" className={styles.logoBlock}>
        <Feather type="logo" className={styles.logo} />
        <div className={styles.logoText}>MaoMarket</div>
      </Flex>
    </Link>
  );
};

export default HeaderLogo;
