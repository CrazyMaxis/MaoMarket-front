import { Flex } from 'antd';
import useScreenWidthSize from 'hooks/useScreenWidthSize';
import HeaderActions from './components/HeaderActions';
import HeaderLogo from './components/HeaderLogo';
import NavMenu from './components/NavMenu';
import styles from './index.module.scss';

const Header = () => {
  const { screenWidth } = useScreenWidthSize();

  const showNavMenu = screenWidth >= 1220;

  return (
    <header className={styles.root}>
      <Flex
        align="center"
        justify="space-between"
        className={styles.headerContent}
      >
        <HeaderLogo />
        <HeaderActions />
      </Flex>
      {showNavMenu && <NavMenu />}
    </header>
  );
};

export default Header;
