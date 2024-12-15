import { Dropdown } from 'antd';
import { Button, Feather } from 'components';
import UserDropdownContent from '../UserDropdownContent';
import styles from './index.module.scss';

const UserDropdown = () => {
  return (
    <Dropdown placement="bottom" dropdownRender={() => <UserDropdownContent />}>
      <div>
        <Button
          type="link"
          icon={<Feather type="userInCircle" className={styles.iconUser} />}
        />
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
