import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import NewsService from 'api/services/NewsService';
import { PostScheme, PostValidationScheme } from 'schemes/post';
import { yupResolver } from '@hookform/resolvers/yup';
import useDataLoader from 'hooks/useDataLoader';
import { PATH } from 'routes/path';

export const useEditPost = () => {
  const methods = useForm<PostScheme>({
    resolver: yupResolver(PostValidationScheme),
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadData, isLoading, res, error } = useDataLoader(
    NewsService.getNewsInfo,
  );

  useEffect(() => {
    loadData(id);
  }, []);

  useEffect(() => {
    if (res?.data) {
      reset(res.data);
    }
  }, [res?.data]);

  const { handleSubmit, reset } = methods;

  const onCancel = () => {
    navigate(PATH.NEWS);
  };

  const onSave = async (data: PostScheme) => {
    const formData = new FormData();
    formData.append('Title', data.title);
    formData.append('Body', data.body);
    if (Array.isArray(data.newImage) && data.newImage.length > 0) {
      formData.append('Image', data.newImage[0]);
    }

    if (id) {
      await NewsService.updatePost(id, formData);
    }
    navigate(PATH.NEWS);
  };

  useEffect(() => {}, []);

  return { methods, onCancel, onSave: handleSubmit(onSave) };
};
