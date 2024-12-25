import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserService from 'api/services/UserService';
import { ProfileScheme, ProfileValidationScheme } from 'schemes/profile';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUser } from 'reduxApp/authentification';
import { useAppSelector } from 'hooks/customReduxHooks';
import { PATH } from 'routes/path';

export const useEditProfile = () => {
  const methods = useForm<ProfileScheme>({
    resolver: yupResolver(ProfileValidationScheme),
  });
  const navigate = useNavigate();
  const user = useAppSelector((state) => getUser(state));

  const { handleSubmit, setValue } = methods;

  const onCancel = () => {
    navigate(PATH.PROFILE);
  };

  const onSave = async (data: ProfileScheme) => {
    const userId = user?.id;
    if (userId) {
      await UserService.updateProfile(userId, data);
      navigate(PATH.PROFILE);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phoneNumber', user.phoneNumber);
      setValue('telegramUsername', user.telegramUsername);
    }
  }, [user, setValue]);

  return { methods, onCancel, onSave: handleSubmit(onSave) };
};
