import { REQUIRED } from 'constants/scheme-messages';
import * as yup from 'yup';

export const CatValidationScheme = yup.object({
  name: yup.string().required(REQUIRED),
  gender: yup.string().required(REQUIRED),
  birthDate: yup.string().required(REQUIRED),
  breedId: yup.string().required(REQUIRED),
  description: yup.string().required(REQUIRED),
  isCattery: yup.boolean(),
  fatherId: yup.string(),
  motherId: yup.string(),
  photos: yup.mixed(),
  photosToDelete: yup.array().of(yup.string()),
  newPhotos: yup.array().of(yup.mixed()),
});

export type CatScheme = yup.InferType<typeof CatValidationScheme>;
