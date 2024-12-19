import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CatService from 'api/services/CatService';
import { CatScheme, CatValidationScheme } from 'schemes/cat';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH } from 'routes/path';

export const useEdiCat = () => {
  const methods = useForm<CatScheme>({
    resolver: yupResolver(CatValidationScheme),
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleSubmit } = methods;

  const onCancel = () => {
    navigate(PATH.PROFILE);
  };

  const onSave = async (data: CatScheme) => {
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Gender', data.gender);
    formData.append('BirthDate', data.birthDate);
    formData.append('BreedId', data.breedId);
    formData.append('Description', data.description || '');
    formData.append('FatherId', data.fatherId || '');
    formData.append('MotherId', data.motherId || '');

    if (data.photos && data.photos.length > 0) {
      data.photos.forEach((photo: File) => {
        formData.append('Photos', photo);
      });
    }

    if (id) {
      await CatService.editCat(id, formData);
      navigate(PATH.PROFILE);
    }
  };

  useEffect(() => {}, []);

  return { methods, onCancel, onSave: handleSubmit(onSave) };
};
