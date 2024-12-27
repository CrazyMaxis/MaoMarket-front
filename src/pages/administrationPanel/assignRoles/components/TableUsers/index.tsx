import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Flex } from 'antd';
import UserService from 'api/services/UserService';
import { PAGE_SIZE } from 'constants/basic';
import { IUserInstance } from 'models/IUserInstance';
import { toggleRefresh } from 'reduxApp/refsreshSlice';
import { Button, Drawer, Feather, Table } from 'components';
import { DrawerContent } from './components/DrawerContent';
import { useTableUsers } from './hooks/useTableUsers';

export const TableUsers = () => {
  const { columns, data, totalCount } = useTableUsers();
  const [selectedUser, setSelectedUser] = useState<IUserInstance | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
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
      UserService.deleteUser(selectedUser?.id).then(() => {
        dispatch(toggleRefresh());

        const currentPage = Number(searchParams.get('page')) || 1;
        const isLastItemOnPage = data.length === 1;

        if (isLastItemOnPage && currentPage > 1) {
          setSearchParams((prev) => {
            const updatedParams = new URLSearchParams(prev);
            updatedParams.set('page', String(currentPage - 1));
            return updatedParams;
          });
        }
      });
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
