import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Col } from 'antd';
import { FilterBar, InputControl } from 'components';
import useFilterForm from './hooks/useFilterForm';

export const FilterForm = () => {
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'assignRoles',
  });
  const { methods, onReset } = useFilterForm();
  const [searchParams] = useSearchParams();

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
      </FormProvider>
    </FilterBar>
  );
};
