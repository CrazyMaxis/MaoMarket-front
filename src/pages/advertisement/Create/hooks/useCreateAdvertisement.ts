import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AdvertisementService from 'api/services/AdvertisementService';
import {
  AdvertisementScheme,
  AdvertisementValidationScheme,
} from 'schemes/advertisement';
import { yupResolver } from '@hookform/resolvers/yup';
import { NotificationContext } from 'contexts/NotificationProvider';
import { PATH } from 'routes/path';

export const useCreateAdvertisement = () => {
  const { t } = useTranslation('advertisement', { keyPrefix: 'notification' });
  const methods = useForm<AdvertisementScheme>({
    resolver: yupResolver(AdvertisementValidationScheme),
  });
  const navigate = useNavigate();
  const { notification } = useContext(NotificationContext);

  const { handleSubmit } = methods;

  const onCancel = () => {
    navigate(PATH.ADVERTISEMENTS);
  };

  const onSave = async (data: AdvertisementScheme) => {
    try {
      await AdvertisementService.createAdvertisement(data);
      navigate(PATH.ADVERTISEMENTS);
    } catch (e) {
      notification.error({
        message: t('error.title'),
        description: t('error.message'),
      });
    }
  };

  return { methods, onCancel, onSave: handleSubmit(onSave) };
};
