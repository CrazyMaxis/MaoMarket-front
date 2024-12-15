import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  AuthorizationScheme,
  AuthorizationValidationScheme,
} from 'schemes/authorization';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  clearError,
  getStateAuthError,
  login,
} from 'reduxApp/authentification';
import { useAppDispatch, useAppSelector } from 'hooks/customReduxHooks';
import { PATH } from 'routes/path';

const useFormAuthorization = () => {
  const { t } = useTranslation('authorization');
  const methods = useForm<AuthorizationScheme>({
    resolver: yupResolver(AuthorizationValidationScheme),
  });
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => getStateAuthError(state));
  const navigate = useNavigate();

  const { setError, watch, clearErrors, handleSubmit } = methods;

  const onLogin = async (data: AuthorizationScheme) => {
    dispatch(login(data));
    navigate(PATH.HOME);
  };

  useEffect(() => {
    const subscription = watch(() => {
      if (isError) {
        clearErrors(['email', 'password']);
        dispatch(clearError());
      }
    });

    if (isError) {
      setError('email', {
        type: 'manual',
        message: ` `,
      });
      setError('password', {
        type: 'manual',
        message: t('errorAuth'),
      });
    }

    return () => subscription.unsubscribe();
  }, [isError]);

  return {
    methods,
    onLogin: handleSubmit(onLogin),
  };
};

export default useFormAuthorization;
