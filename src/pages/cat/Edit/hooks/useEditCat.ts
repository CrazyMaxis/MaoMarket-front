import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CatService from 'api/services/CatService';
import { CatScheme, CatValidationScheme } from 'schemes/cat';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH } from 'routes/path';

export const useEditCat = () => {
  const methods = useForm<CatScheme>({
    resolver: yupResolver(CatValidationScheme),
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const [oldPhotos, setOldPhotos] = useState<
    Array<{ id: string; url: string }>
  >([]);

  const { handleSubmit, reset } = methods;

  const onCancel = () => {
    navigate(PATH.PROFILE);
  };

  const onSave = async (data: CatScheme) => {
    const formData = new FormData();
    formData.append('Description', data.description || '');
    formData.append('IsCattery', (data.isCattery || false).toString());

    const photosToDelete = oldPhotos.filter(
      (oldPhoto) =>
        !data.photos.some(
          (newPhoto: { id: string; url: string }) =>
            newPhoto.id === oldPhoto.id,
        ),
    );

    if (photosToDelete && photosToDelete.length > 0) {
      photosToDelete
        .filter(
          (photo): photo is { id: string; url: string } => photo !== undefined,
        )
        .forEach((photo) => {
          formData.append('PhotosToDelete', photo.id);
        });
    }

    if (data.newPhotos && data.newPhotos.length > 0) {
      data.newPhotos
        .filter((photo): photo is File => photo !== undefined)
        .forEach((photo) => {
          formData.append('NewPhotos', photo);
        });
    }

    if (id) {
      await CatService.editCat(id, formData);
      navigate(PATH.PROFILE);
    }
  };

  const fetchCatData = async () => {
    if (id) {
      const responseCat = await CatService.getCatInfo(id);
      const responseParents = await CatService.getCatPedigree(id);
      const catData = responseCat.data;
      const parentsData = responseParents.data;

      setOldPhotos(catData.photos);

      const defaultValues: CatScheme = {
        name: catData.name,
        gender: catData.gender,
        birthDate: catData.birthDate,
        breedId: catData.breed,
        description: catData.description,
        fatherId: parentsData.father?.name,
        motherId: parentsData.mother?.name,
        photos: catData.photos,
        photosToDelete: [],
        newPhotos: [],
      };

      reset(defaultValues);
    }
  };

  useEffect(() => {
    fetchCatData();
  }, [id]);

  return { methods, onCancel, onSave: handleSubmit(onSave) };
};
