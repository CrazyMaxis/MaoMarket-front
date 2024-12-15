import { Button, Flex } from 'antd';
import { Feather } from 'components';
import UserDropdown from './components/UserDropdown';
import styles from './index.module.scss';

const HeaderActions = () => {
  return (
    <Flex align="center" gap={10} className={styles.root}>
      <Button
        type="link"
        icon={<Feather type="bell" className={styles.icon} />}
      />
      <UserDropdown />
    </Flex>
  );
};

export default HeaderActions;
