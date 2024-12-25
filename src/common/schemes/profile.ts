import { PHONE_MAX, REQUIRED } from 'constants/scheme-messages';
import * as yup from 'yup';

export const ProfileValidationScheme = yup.object({
  name: yup.string().required(REQUIRED),
  email: yup.string().required(REQUIRED),
  phoneNumber: yup.string().max(15, PHONE_MAX).nullable(),
  telegramUsername: yup.string().nullable(),
});

export type ProfileScheme = yup.InferType<typeof ProfileValidationScheme>;
