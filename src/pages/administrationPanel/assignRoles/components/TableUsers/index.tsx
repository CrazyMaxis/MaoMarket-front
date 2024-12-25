import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Flex } from 'antd';
import UserService from 'api/services/UserService';
import { IUserInstance } from 'models/IUserInstance';
import { toggleRefresh } from 'reduxApp/refsreshSlice';
import { Button, Drawer, Feather, Table } from 'components';
import { DrawerContent } from './components/DrawerContent';
import { useTableUsers } from './hooks/useTableUsers';

export const TableUsers = () => {
  const { columns, data } = useTableUsers();
  const [selectedUser, setSelectedUser] = useState<IUserInstance | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'assignRoles.drawer',
  });
  const dispatch = useDispatch();

  const onRowClick = (record: IUserInstance) => {
    setSelectedUser(record);
    setIsOpen(true);
  };

  const onCloseDrawer = () => {
    setIsOpen(false);
  };

  const onDelete = () => {
    if (selectedUser) {
      UserService.deleteUser(selectedUser?.id);
      dispatch(toggleRefresh());
      onCloseDrawer();
    }
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
        title={
          <Flex gap={24} align="center">
            <div>{t('title')}</div>
            <Button icon={<Feather type="busketIcon" />} onClick={onDelete}>
              {t('delete')}
            </Button>
          </Flex>
        }
        destroyOnClose
      >
        <DrawerContent user={selectedUser as IUserInstance} />
      </Drawer>
    </>
  );
};
