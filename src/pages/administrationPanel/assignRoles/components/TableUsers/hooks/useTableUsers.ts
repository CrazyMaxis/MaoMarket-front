import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TableProps } from 'antd';
import UserService from 'api/services/UserService';
import { PAGE_SIZE } from 'constants/basic';
import { RootState } from 'reduxApp/store';
import useDataLoader from 'hooks/useDataLoader';

export const useTableUsers = () => {
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'assignRoles',
  });
  const [searchParams] = useSearchParams();
  const refresh = useSelector(
    (state: RootState) => state.refreshReducer.refresh,
  );

  const { loadData, isLoading, res } = useDataLoader(UserService.getUsers);

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
    { key: 'name', dataIndex: 'name', title: t('columns.name') },
    { key: 'email', dataIndex: 'email', title: t('columns.email') },
    { key: 'role', dataIndex: 'role', title: t('columns.role') },
    {
      key: 'isBlocked',
      title: t('columns.isBlocked'),
      render: (item) => (item.isBlocked ? t('true') : t('false')),
    },
  ];

  return {
    columns,
    data: res?.data.items,
    totalCount: res?.data.totalCount,
    isLoading,
  };
};
