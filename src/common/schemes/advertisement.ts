import { REQUIRED } from 'constants/scheme-messages';
import * as yup from 'yup';

export const AdvertisementValidationScheme = yup.object({
  price: yup.number().required(REQUIRED),
  catId: yup.string().required(REQUIRED),
});

export type AdvertisementScheme = yup.InferType<
  typeof AdvertisementValidationScheme
>;
