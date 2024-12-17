import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserService from 'api/services/UserService';
import { getUser } from 'reduxApp/authentification';
import { useAppSelector } from 'hooks/customReduxHooks';
import { PATH } from 'routes/path';

export const useEditProfile = () => {
  const methods = useForm<{ name: string; email: string }>();
  const navigate = useNavigate();
  const user = useAppSelector((state) => getUser(state));

  const { handleSubmit, setValue } = methods;

  const onCancel = () => {
    navigate(PATH.PROFILE);
  };

  const onSave = async (data: { name: string; email: string }) => {
    const userId = user?.id;
    const { name } = data;
    if (userId) {
      await UserService.updateProfile(userId, name);
      navigate(PATH.PROFILE);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  return { methods, onCancel, onSave: handleSubmit(onSave) };
};
