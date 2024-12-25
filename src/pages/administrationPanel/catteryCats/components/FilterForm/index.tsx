import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Col } from 'antd';
import BreedService from 'api/services/BreedService';
import { IBreed } from 'models/IBreed';
import { FilterBar, InputControl, SelectControl } from 'components';
import useFilterForm from './hooks/useFilterForm';

export const FilterForm = () => {
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'catteryCats',
  });
  const { methods, onReset } = useFilterForm();
  const [searchParams] = useSearchParams();
  const [breeds, setBreeds] = useState<IBreed[]>([]);

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
    <FilterBar onReset={onReset}>
      <FormProvider {...methods}>
        <Col span={6}>
          <InputControl
            name="searchName"
            includeSearchIcon
            defaultValue={searchParams.get('searchName')}
            inputProps={{
              placeholder: t('placeholders.searchName'),
            }}
          />
        </Col>
        <Col span={6}>
          <SelectControl
            name="gender"
            defaultValue={searchParams.get('gender')}
            selectProps={{
              placeholder: t('placeholders.gender'),
              options: [
                { label: 'Мужской', value: 'Male' },
                { label: 'Женский', value: 'Female' },
              ],
              allowClear: true,
            }}
          />
        </Col>
        <Col span={6}>
          <SelectControl
            name="breedId"
            defaultValue={searchParams.get('breed')}
            selectProps={{
              placeholder: t('placeholders.breed'),
              options: breedOptions,
              allowClear: true,
            }}
          />
        </Col>
      </FormProvider>
    </FilterBar>
  );
};
