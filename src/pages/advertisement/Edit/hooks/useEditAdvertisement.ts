import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import AdvertisementService from 'api/services/AdvertisementService';
import {
  AdvertisementScheme,
  AdvertisementValidationScheme,
} from 'schemes/advertisement';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH } from 'routes/path';

export const useEditAdvertisement = () => {
  const methods = useForm<AdvertisementScheme>({
    resolver: yupResolver(AdvertisementValidationScheme),
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleSubmit, reset } = methods;

  const onCancel = () => {
    navigate(PATH.ADVERTISEMENTS);
  };

  const onSave = async (data: AdvertisementScheme) => {
    if (id) {
      await AdvertisementService.editAdvertisement(id, data);
      navigate(PATH.ADVERTISEMENTS);
    }
  };

  const fetchCatData = async () => {
    if (id) {
      const responseAdv = await AdvertisementService.getAdvertisement(id);
      const advData = responseAdv.data;

      const defaultValues: AdvertisementScheme = {
        price: advData.price,
        catId: advData.catId,
      };

      reset(defaultValues);
    }
  };

  useEffect(() => {
    fetchCatData();
  }, [id]);

  return { methods, onCancel, onSave: handleSubmit(onSave) };
};
