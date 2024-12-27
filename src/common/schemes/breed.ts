import { REQUIRED } from 'constants/scheme-messages';
import * as yup from 'yup';

export const BreedValidationScheme = yup.object({
  name: yup.string().required(REQUIRED),
});

export type BreedScheme = yup.InferType<typeof BreedValidationScheme>;
