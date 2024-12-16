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
  getStateAuth,
  getStateAuthError,
  getStateVerifyError,
  login,
} from 'reduxApp/authentification';
import { useAppDispatch, useAppSelector } from 'hooks/customReduxHooks';
import { PATH, PATH_AUTHORIZATION } from 'routes/path';

export const useLogin = () => {
  const { t } = useTranslation('authorization');
  const methods = useForm<AuthorizationScheme>({
    resolver: yupResolver(AuthorizationValidationScheme),
  });
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => getStateAuthError(state));
  const isVerifyError = useAppSelector((state) => getStateVerifyError(state));
  const isAuth = useAppSelector((state) => getStateAuth(state));
  const navigate = useNavigate();

  const { setError, watch, clearErrors, handleSubmit } = methods;

  const onLogin = async (data: AuthorizationScheme) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isAuth) {
      navigate(PATH.HOME);
    }
  }, [isAuth]);

  useEffect(() => {
    if (isVerifyError) {
      navigate(`${PATH.AUTHARIZATION}/${PATH_AUTHORIZATION.VERIFY}`);
      dispatch(clearError());
    }
  }, [isVerifyError]);

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
