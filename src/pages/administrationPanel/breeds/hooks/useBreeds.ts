import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { TableProps } from 'antd';
import BreedService from 'api/services/BreedService';
import { RootState } from 'reduxApp/store';
import useDataLoader from 'hooks/useDataLoader';

export const useBreeds = () => {
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'breeds',
  });
  const refresh = useSelector(
    (state: RootState) => state.refreshReducer.refresh,
  );

  const { loadData, isLoading, res } = useDataLoader(BreedService.getBreeds);

  useEffect(() => {
    loadData();
  }, [refresh]);

  const columns: TableProps['columns'] = [
    { key: 'id', dataIndex: 'id', title: t('columns.id') },
    { key: 'name', dataIndex: 'name', title: t('columns.name') },
  ];

  return {
    columns,
    data: res?.data,
    isLoading,
  };
};
