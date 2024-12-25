import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IUserInstance } from 'models/IUserInstance';
import { Drawer, Table } from 'components';
import { DrawerContent } from './components/DrawerContent';
import { useTableRequests } from './hooks/useTableRequests';

export const TableRequests = () => {
  const { columns, data } = useTableRequests();
  const [selectedUser, setSelectedUser] = useState<IUserInstance | null>(null);
  const [isOpen, setIsOpen] = useState(false);
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
        dataSource={dataSource}
        isSelecting={false}
        onRow={(record) => ({
          onClick: () => onRowClick(record as IUserInstance),
        })}
      />
      <Drawer
        open={isOpen}
        onClose={onCloseDrawer}
        title={t('title')}
        destroyOnClose
      >
        <DrawerContent user={selectedUser as IUserInstance} />
      </Drawer>
    </>
  );
};
