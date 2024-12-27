import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Flex, Input } from 'antd';
import BreedService from 'api/services/BreedService';
import { BreedScheme } from 'schemes/breed';
import { toggleRefresh } from 'reduxApp/refsreshSlice';

interface IDrawerContentProps {
  breed: { id: string; name: string };
  onClose: () => void;
}

export const DrawerContentEdit = ({ breed, onClose }: IDrawerContentProps) => {
  const [name, setName] = useState(breed.name);
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'breeds',
  });

  useEffect(() => {
    setName(breed.name);
  }, [breed.name]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsEdited(true);
  };

  const onSave = () => {
    try {
      BreedService.editBreed(breed.id, { name } as BreedScheme);
      dispatch(toggleRefresh());
      setIsEdited(false);
      onClose();
    } catch (error) {
      console.error('Error saving breed:', error);
    }
  };

  return (
    <Flex gap={24} vertical>
      <Flex gap={8}>
        <Input placeholder={breed.name} value={name} onChange={onInputChange} />
      </Flex>
      {isEdited && (
        <Button onClick={onSave} type="primary">
          {t('editButton')}
        </Button>
      )}
    </Flex>
  );
};
