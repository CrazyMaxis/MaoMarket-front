import AuthService from 'api/services/AuthService';
import { logout } from 'reduxApp/authentification';
import { useAppDispatch } from 'hooks/customReduxHooks';

const useUserDropdownContent = () => {
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    AuthService.logout();
  };

  return { onLogout };
};

export default useUserDropdownContent;
