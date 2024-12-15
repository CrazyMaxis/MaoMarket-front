import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex } from 'antd';
import { getStateAuth } from 'reduxApp/authentification';
import { Button } from 'components';
import { PATH, PATH_AUTHORIZATION } from 'routes/path';
import useUserDropdownContent from './hooks/useUserDropdownContent';

const UserDropdownContent = () => {
  const { t } = useTranslation('layout', { keyPrefix: 'header.userProfile' });
  const { onLogout } = useUserDropdownContent();
  const isAuth = useSelector(getStateAuth);

  return (
    <Flex vertical align="center" gap={8}>
      {isAuth ? (
        <>
          <Button>
            <Link to="/profile">{t('profile')}</Link>
          </Button>
          <Button onClick={onLogout}>{t('logout')}</Button>
        </>
      ) : (
        <Button>
          <Link to={`${PATH.AUTHARIZATION}/${PATH_AUTHORIZATION.LOGIN}`}>
            {t('login')}
          </Link>
        </Button>
      )}
    </Flex>
  );
};

export default UserDropdownContent;
