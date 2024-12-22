import { REQUIRED } from 'constants/scheme-messages';
import * as yup from 'yup';

export const PostValidationScheme = yup.object({
  title: yup.string().required(REQUIRED),
  body: yup.string().required(REQUIRED),
  image: yup.mixed().required(REQUIRED),
  newImage: yup.mixed(),
});

export type PostScheme = yup.InferType<typeof PostValidationScheme>;
