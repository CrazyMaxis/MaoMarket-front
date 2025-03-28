import { REQUIRED } from 'constants/scheme-messages';
import * as yup from 'yup';

export const RegistrationValidationScheme = yup.object({
  name: yup.string().required(REQUIRED),
  email: yup.string().email().required(REQUIRED),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать не меньше 6 символов')
    .required(REQUIRED),
});

export type RegistrationScheme = yup.InferType<
  typeof RegistrationValidationScheme
>;

export const VerifyCodeValidationScheme = yup.object({
  code: yup
    .string()
    .max(6, 'Код должен состоять из 6 символов')
    .required(REQUIRED),
});

export type VerifyCodeScheme = yup.InferType<typeof VerifyCodeValidationScheme>;
