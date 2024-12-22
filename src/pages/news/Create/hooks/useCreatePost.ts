import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import NewsService from 'api/services/NewsService';
import { PostScheme, PostValidationScheme } from 'schemes/post';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH } from 'routes/path';

export const useCreatePost = () => {
  const methods = useForm<PostScheme>({
    resolver: yupResolver(PostValidationScheme),
  });
  const navigate = useNavigate();

  const { handleSubmit } = methods;

  const onCancel = () => {
    navigate(PATH.NEWS);
  };

  const onSave = async (data: PostScheme) => {
    const formData = new FormData();
    formData.append('Title', data.title);
    formData.append('Body', data.body);
    if (Array.isArray(data.image) && data.image.length > 0) {
      formData.append('Image', data.image[0]);
    }

    await NewsService.createPost(formData);
    navigate(PATH.NEWS);
  };

  useEffect(() => {}, []);

  return { methods, onCancel, onSave: handleSubmit(onSave) };
};
