import { Outlet } from 'react-router-dom';
import { Flex } from 'antd';
import styles from './index.module.scss';

const Authorization = () => {
  return (
    <Flex align="center" justify="center" className={styles.root}>
      <Outlet />
    </Flex>
  );
};

export default Authorization;
