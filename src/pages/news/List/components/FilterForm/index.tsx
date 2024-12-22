import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Col } from 'antd';
import { FilterBar, InputControl, SelectControl } from 'components';
import useFilterForm from './hooks/useFilterForm';

export const FilterForm = () => {
  const { t } = useTranslation('news');
  const { t: tCommon } = useTranslation('common');
  const { methods, onReset } = useFilterForm();
  const [searchParams] = useSearchParams();

  return (
    <FilterBar onReset={onReset}>
      <FormProvider {...methods}>
        <Col span={6}>
          <InputControl
            name="searchTitle"
            includeSearchIcon
            defaultValue={searchParams.get('searchTitle')}
            inputProps={{
              placeholder: t('placehodlers.searchTitle'),
            }}
          />
        </Col>
        <Col span={6}>
          <SelectControl
            name="sortDirection"
            label={t('labels.sortDirection')}
            layout="horizontal"
            boldLabel={false}
            defaultValue={'desc'}
            selectProps={{
              options: [
                { label: tCommon('sortDirection.asc'), value: 'asc' },
                { label: tCommon('sortDirection.desc'), value: 'desc' },
              ],
            }}
          />
        </Col>
      </FormProvider>
    </FilterBar>
  );
};
