import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AdvertisementService from 'api/services/AdvertisementService';
import {
  AdvertisementScheme,
  AdvertisementValidationScheme,
} from 'schemes/advertisement';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH } from 'routes/path';

export const useCreateAdvertisement = () => {
  const methods = useForm<AdvertisementScheme>({
    resolver: yupResolver(AdvertisementValidationScheme),
  });
  const navigate = useNavigate();

  const { handleSubmit } = methods;

  const onCancel = () => {
    navigate(PATH.PROFILE);
  };

  const onSave = async (data: AdvertisementScheme) => {
    await AdvertisementService.createAdvertisement(data);
    navigate(PATH.ADVERTISEMENTS);
  };

  useEffect(() => {}, []);

  return { methods, onCancel, onSave: handleSubmit(onSave) };
};
