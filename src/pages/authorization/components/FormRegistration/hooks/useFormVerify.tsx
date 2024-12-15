import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  VerifyCodeScheme,
  VerifyCodeValidationScheme,
} from 'schemes/registration';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  clearError,
  getStateAuthError,
  getUser,
  verify,
} from 'reduxApp/authentification';
import { NotificationContext } from 'contexts/NotificationProvider';
import { useAppDispatch, useAppSelector } from 'hooks/customReduxHooks';
import { PATH } from 'routes/path';

export const useFormVerify = () => {
  const { t } = useTranslation('registration');
  const methods = useForm<VerifyCodeScheme>({
    resolver: yupResolver(VerifyCodeValidationScheme),
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => getUser(state));
  const isError = useAppSelector((state) => getStateAuthError(state));
  const navigate = useNavigate();
  const { notification } = useContext(NotificationContext);

  const { setError, watch, clearErrors, handleSubmit } = methods;

  const onVerify = async (data: VerifyCodeScheme) => {
    const resultAction = await dispatch(
      verify({ userId: user?.id || '', code: data.code }),
    );
    if (verify.fulfilled.match(resultAction)) {
      navigate(PATH.HOME);
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
        clearErrors(['code']);
        dispatch(clearError());
      }
    });

    if (isError) {
      setError('code', {
        type: 'manual',
        message: ` `,
      });
    }

    return () => subscription.unsubscribe();
  }, [isError]);

  return {
    methodsVerify: methods,
    onVerify: handleSubmit(onVerify),
  };
};
