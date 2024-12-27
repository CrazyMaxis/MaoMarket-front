import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Flex } from 'antd';
import BreedService from 'api/services/BreedService';
import { IBreed } from 'models/IBreed';
import { toggleRefresh } from 'reduxApp/refsreshSlice';
import { Button, Drawer, Feather, Table } from 'components';
import { DrawerContentCreate } from './components/DrawerContentCreate';
import { DrawerContentEdit } from './components/DrawerContentEdit';
import { useBreeds } from './hooks/useBreeds';
import styles from './index.module.scss';

const Breeds = () => {
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'breeds',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<IBreed | null>(null);
  const { columns, data, isLoading } = useBreeds();
  const dispatch = useDispatch();

  const onCloseDrawer = () => {
    setIsOpen(false);
    setSelectedBreed(null);
    setIsCreating(false);
  };

  const onRowClick = (breed: IBreed) => {
    setSelectedBreed(breed);
    setIsOpen(true);
    setIsCreating(false);
  };

  const onDelete = () => {
    if (selectedBreed) {
      BreedService.deleteBreed(selectedBreed.id).then(() => {
        dispatch(toggleRefresh());
      });
      onCloseDrawer();
    }
  };

  const onAddClick = () => {
    setIsCreating(true);
    setIsOpen(true);
  };

  return (
    <Flex vertical gap={8}>
      <Flex>
        <Button
          className={styles.buttonAdd}
          icon={<Feather type="plusIcon" />}
          onClick={onAddClick}
        >
          {t('add')}
        </Button>
      </Flex>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={data as IBreed[]}
        isSelecting={false}
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
        {isCreating ? (
          <DrawerContentCreate onClose={onCloseDrawer} />
        ) : (
          selectedBreed && (
            <DrawerContentEdit breed={selectedBreed} onClose={onCloseDrawer} />
          )
        )}
      </Drawer>
    </Flex>
  );
};

export default Breeds;
