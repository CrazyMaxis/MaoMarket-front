import { REQUIRED } from 'constants/scheme-messages';
import * as yup from 'yup';

export const CommentValidationScheme = yup.object({
  postId: yup.string(),
  body: yup.string().required(REQUIRED),
});

export type CommentScheme = yup.InferType<typeof CommentValidationScheme>;
