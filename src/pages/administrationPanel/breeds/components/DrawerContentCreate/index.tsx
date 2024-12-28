import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Flex, Input } from 'antd';
import BreedService from 'api/services/BreedService';
import { BreedScheme } from 'schemes/breed';
import { toggleRefresh } from 'reduxApp/refsreshSlice';

interface IDrawerContentCreateProps {
  onClose: () => void;
}

export const DrawerContentCreate = ({ onClose }: IDrawerContentCreateProps) => {
  const [name, setName] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'breeds',
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsEdited(true);
  };

  const onCreate = () => {
    try {
      BreedService.createBreed({ name } as BreedScheme);
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
        <Input
          placeholder={t('placeholder')}
          value={name}
          onChange={onInputChange}
        />
      </Flex>
      {isEdited && (
        <Button onClick={onCreate} type="primary">
          {t('createButton')}
        </Button>
      )}
    </Flex>
  );
};
