import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TableProps } from 'antd';
import UserService from 'api/services/UserService';
import { PAGE_SIZE } from 'constants/basic';
import { RootState } from 'reduxApp/store';
import useDataLoader from 'hooks/useDataLoader';

export const useTableRequests = () => {
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'assignRoles',
  });
  const [searchParams] = useSearchParams();
  const refresh = useSelector(
    (state: RootState) => state.refreshReducer.refresh,
  );

  const { loadData, isLoading, res } = useDataLoader(
    UserService.getUsersWithRequests,
  );

  const loadUsers = useCallback(() => {
    const page = searchParams.get('page') || '1';
    loadData({
      ...Object.fromEntries(searchParams),
      pageSize: PAGE_SIZE,
      page,
    });
  }, [searchParams]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers, refresh]);

  const columns: TableProps['columns'] = [
    { key: 'id', dataIndex: 'id', title: t('columns.id') },
    { key: 'name', dataIndex: 'name', title: t('columns.name') },
  ];

  return {
    columns,
    data: res?.data.items,
    totalCount: res?.data.totalCount,
    isLoading,
  };
};
