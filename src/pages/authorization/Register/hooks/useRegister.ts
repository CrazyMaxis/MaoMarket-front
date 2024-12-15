import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  RegistrationScheme,
  RegistrationValidationScheme,
} from 'schemes/registration';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  clearError,
  getStateAuthError,
  register,
} from 'reduxApp/authentification';
import { NotificationContext } from 'contexts/NotificationProvider';
import { useAppDispatch, useAppSelector } from 'hooks/customReduxHooks';
import { PATH, PATH_AUTHORIZATION } from 'routes/path';

export const useRegister = () => {
  const { t } = useTranslation('registration');
  const methods = useForm<RegistrationScheme>({
    resolver: yupResolver(RegistrationValidationScheme),
  });
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => getStateAuthError(state));
  const { notification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const { setError, watch, clearErrors, handleSubmit } = methods;

  const onRegister = async (data: RegistrationScheme) => {
    const resultAction = await dispatch(register(data));
    if (register.fulfilled.match(resultAction)) {
      navigate(`${PATH.AUTHARIZATION}/${PATH_AUTHORIZATION.VERIFY}`);
    } else {
      notification.error({
        message: t('errorTitle'),
        description: resultAction.error.message,
      });
    }
  };

  useEffect(() => {
    const subscription = watch(() => {
      if (isError) {
        clearErrors(['name', 'email', 'password']);
        dispatch(clearError());
      }
    });

    if (isError) {
      setError('name', {
        type: 'manual',
        message: ` `,
      });
      setError('email', {
        type: 'manual',
        message: ` `,
      });
      setError('password', {
        type: 'manual',
        message: ` `,
      });
    }

    return () => subscription.unsubscribe();
  }, [isError]);

  return {
    methods: methods,
    onRegister: handleSubmit(onRegister),
  };
};
