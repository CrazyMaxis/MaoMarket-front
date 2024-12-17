import { REQUIRED } from 'constants/scheme-messages';
import * as yup from 'yup';

export const AuthorizationValidationScheme = yup.object({
  email: yup.string().email().required(REQUIRED),
  password: yup.string().required(REQUIRED),
});

export type AuthorizationScheme = yup.InferType<
  typeof AuthorizationValidationScheme
>;
