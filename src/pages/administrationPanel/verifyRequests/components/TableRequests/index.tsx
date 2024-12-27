import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from 'constants/basic';
import { IUserInstance } from 'models/IUserInstance';
import { Drawer, Table } from 'components';
import { DrawerContent } from './components/DrawerContent';
import { useTableRequests } from './hooks/useTableRequests';

export const TableRequests = () => {
  const { columns, data, totalCount, isLoading } = useTableRequests();
  const [selectedUser, setSelectedUser] = useState<IUserInstance | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'assignRoles.drawer',
  });

  const onRowClick = (record: IUserInstance) => {
    setSelectedUser(record);
    setIsOpen(true);
  };

  const onCloseDrawer = () => {
    setIsOpen(false);
  };

  const dataSource = data?.map((item: IUserInstance) => ({
    ...item,
    key: item.id,
  }));

  return (
    <>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={dataSource}
        isSelecting={false}
        onRow={(record) => ({
          onClick: () => onRowClick(record as IUserInstance),
        })}
        pagination={{
          pageSize: PAGE_SIZE,
          total: totalCount,
          current: Number(searchParams.get('page')) || 1,
          onChange: (page) =>
            setSearchParams((prev) => {
              prev.set('page', String(page));
              return prev;
            }),
        }}
      />
      <Drawer
        open={isOpen}
        onClose={onCloseDrawer}
        title={t('title')}
        destroyOnClose
      >
        <DrawerContent
          user={selectedUser as IUserInstance}
          onCloseDrawer={onCloseDrawer}
        />
      </Drawer>
    </>
  );
};
