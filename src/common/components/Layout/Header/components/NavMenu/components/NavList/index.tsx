import { Flex } from 'antd';
import useNavMenu from '../../hooks/useNavMenu';
import NavMenuItem from '../NavMenuItem';

const NavList = () => {
  const { items } = useNavMenu();

  return (
    <Flex align="center" gap={32}>
      {items.map((item) => (
        <NavMenuItem navMenuItem={item} key={item.key} />
      ))}
    </Flex>
  );
};

export default NavList;
