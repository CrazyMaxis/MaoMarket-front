import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import { Button, Feather, Table } from 'components';
import { useBreeds } from './hooks/useBreeds';
import styles from './index.module.scss';

const Breeds = () => {
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'breeds',
  });
  const { columns, data, isLoading } = useBreeds();

  return (
    <Flex vertical gap={8}>
      <Flex>
        <Button className={styles.buttonAdd} icon={<Feather type="plusIcon" />}>
          {t('add')}
        </Button>
      </Flex>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={data}
        isSelecting={false}
      />
    </Flex>
  );
};

export default Breeds;
