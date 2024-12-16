import { Flex } from 'antd';
import UserDropdown from './components/UserDropdown';
import styles from './index.module.scss';

const HeaderActions = () => {
  return (
    <Flex align="center" gap={10} className={styles.root}>
      <UserDropdown />
    </Flex>
  );
};

export default HeaderActions;
