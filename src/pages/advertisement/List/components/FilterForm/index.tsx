import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Col } from 'antd';
import BreedService from 'api/services/BreedService';
import { SORT_ORDER_OPTIONS } from 'constants/common-options';
import { IBreed } from 'models/IBreed';
import {
  CheckboxControl,
  FilterBar,
  InputControl,
  SelectControl,
} from 'components';
import useFilterForm from './hooks/useFilterForm';

export const FilterForm = () => {
  const { t } = useTranslation('advertisement');
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
        <Col span={6}>
          <CheckboxControl
            name="isCattery"
            defaultValue={searchParams.get('isCattery') === 'true'}
          >
            {t('placeholders.isCattery')}
          </CheckboxControl>
        </Col>
        <Col span={6}>
          <SelectControl
            name="sortBy"
            defaultValue={searchParams.get('sortBy')}
            selectProps={{
              placeholder: t('placeholders.sortBy'),
              options: [
                { label: 'Дата создания объявления', value: 'createdAt' },
                { label: 'Дата рождения кота', value: 'birthDate' },
              ],
              allowClear: true,
            }}
          />
        </Col>
        <Col span={6}>
          <SelectControl
            name="sortOrder"
            defaultValue={searchParams.get('sortOrder')}
            selectProps={{
              placeholder: t('placeholders.sortOrder'),
              options: SORT_ORDER_OPTIONS(),
              allowClear: true,
            }}
          />
        </Col>
      </FormProvider>
    </FilterBar>
  );
};
