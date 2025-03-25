import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Flex } from 'antd';
import BreedService from 'api/services/BreedService';
import { IBreed } from 'models/IBreed';
import { toggleRefresh } from 'reduxApp/refsreshSlice';
import { Button, Drawer, Feather, Table } from 'components';
import { DrawerContentEdit } from './components/DrawerContentEdit';
import { useBreeds } from './hooks/useBreeds';

const Breeds = () => {
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'breeds',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<IBreed | null>(null);
  const { columns, data, isLoading } = useBreeds();
  const dispatch = useDispatch();

  const onCloseDrawer = () => {
    setIsOpen(false);
    setSelectedBreed(null);
  };

  const onRowClick = (breed: IBreed) => {
    setSelectedBreed(breed);
    setIsOpen(true);
  };

  const onDelete = () => {
    if (selectedBreed) {
      BreedService.deleteBreed(selectedBreed.id).then(() => {
        dispatch(toggleRefresh());
      });
      onCloseDrawer();
    }
  };

  return (
    <Flex vertical gap={8}>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={data as IBreed[]}
        isSelecting={false}
        rowKey={'id'}
        onRow={(record) => ({
          onClick: () => onRowClick(record as IBreed),
        })}
      />
      <Drawer
        open={isOpen}
        onClose={onCloseDrawer}
        title={
          <Flex gap={24} align="center">
            {selectedBreed ? (
              <div>{t('editTitle')}</div>
            ) : (
              <div>{t('createTitle')}</div>
            )}
            {selectedBreed && (
              <Button icon={<Feather type="busketIcon" />} onClick={onDelete}>
                {t('delete')}
              </Button>
            )}
          </Flex>
        }
        destroyOnClose
      >
        {selectedBreed && (
          <DrawerContentEdit breed={selectedBreed} onClose={onCloseDrawer} />
        )}
      </Drawer>
    </Flex>
  );
};

export default Breeds;
