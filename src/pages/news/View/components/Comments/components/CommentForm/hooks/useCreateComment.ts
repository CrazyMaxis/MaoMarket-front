import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import CommentService from 'api/services/CommentService';
import { CommentScheme, CommentValidationScheme } from 'schemes/comment';
import { yupResolver } from '@hookform/resolvers/yup';

interface IUseCreateCommentParams {
  handleCommentCreate: () => void;
}

export const useCreateComment = ({
  handleCommentCreate,
}: IUseCreateCommentParams) => {
  const methods = useForm<CommentScheme>({
    resolver: yupResolver(CommentValidationScheme),
  });
  const { id } = useParams();

  const { handleSubmit, reset } = methods;

  const onCreate = async (data: CommentScheme) => {
    if (id) {
      data.postId = id;
    }

    await CommentService.createComment(data);
    handleCommentCreate();
    reset();
  };

  return { methods, onCreate: handleSubmit(onCreate) };
};
