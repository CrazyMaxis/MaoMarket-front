import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import BreedService from 'api/services/BreedService';
import dayjs from 'dayjs';
import { Roles } from 'enums/Roles';
import { IBreed } from 'models/IBreed';
import { getUser } from 'reduxApp/authentification';
import {
  CheckboxControl,
  DatePickerControl,
  InputControl,
  SelectControl,
  TextAreaControl,
} from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';

interface IGeneralDataProps {
  isEdit: boolean;
}

export const GeneralData = ({ isEdit }: IGeneralDataProps) => {
  const { t } = useTranslation('cat', { keyPrefix: 'form' });
  const [breeds, setBreeds] = useState<IBreed[]>([]);
  const user = useAppSelector((state) => getUser(state));

  const fetchBreeds = async () => {
    const response = await BreedService.getBreeds();
    setBreeds(response.data);
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const breedOptions = breeds.map((breed) => ({
    label: breed.name,
    value: breed.id,
  }));

  return (
    <Row gutter={8}>
      <Col span={6}>
        <InputControl
          name="name"
          label={t('labels.name')}
          inputProps={{ placeholder: t('placeholders.name') }}
          disabled={isEdit}
          required
        />
      </Col>
      <Col span={6}>
        <SelectControl
          name="gender"
          label={t('labels.gender')}
          selectProps={{
            placeholder: t('placeholders.gender'),
            options: [
              { label: 'Мужской', value: 'Male' },
              { label: 'Женский', value: 'Female' },
            ],
          }}
          disabled={isEdit}
          required
        />
      </Col>
      <Col span={6}>
        <DatePickerControl
          name="birthDate"
          label={t('labels.birthDate')}
          datePickerProps={{ maxDate: dayjs() }}
          disabled={isEdit}
          required
        />
      </Col>
      <Col span={6}>
        <SelectControl
          name="breedId"
          label={t('labels.breed')}
          selectProps={{
            placeholder: t('placeholders.breed'),
            options: breedOptions,
          }}
          disabled={isEdit}
          required
        />
      </Col>
      <Col span={24}>
        <TextAreaControl
          name="description"
          label={t('labels.description')}
          textAreaProps={{ placeholder: t('placeholders.description') }}
        />
      </Col>
      {(user?.role === Roles.ADMINISTRATOR ||
        user?.role === Roles.MODERATOR) && (
        <Col span={24}>
          <CheckboxControl name="isCattery">{t('isCattery')}</CheckboxControl>
        </Col>
      )}
    </Row>
  );
};
