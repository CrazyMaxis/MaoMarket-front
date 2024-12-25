import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Col } from 'antd';
import { IS_BLOCKED_OPTIONS, ROLES_OPTIONS } from 'constants/common-options';
import { FilterBar, InputControl, SelectControl } from 'components';
import useFilterForm from './hooks/useFitlerForm';

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
        <Col span={6}>
          <SelectControl
            name="role"
            defaultValue={searchParams.get('role')}
            selectProps={{
              placeholder: t('placeholders.role'),
              options: ROLES_OPTIONS(),
              allowClear: true,
            }}
          />
        </Col>
        <Col span={6}>
          <SelectControl
            name="isBlocked"
            defaultValue={searchParams.get('isBlocked')}
            selectProps={{
              placeholder: t('placeholders.isBlocked'),
              options: IS_BLOCKED_OPTIONS(),
              allowClear: true,
            }}
          />
        </Col>
      </FormProvider>
    </FilterBar>
  );
};
