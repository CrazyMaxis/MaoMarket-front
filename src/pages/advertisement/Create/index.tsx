import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import { Button, CommunicationHeader, Feather } from 'components';
import { Form } from '../components/Form';
import { useCreateAdvertisement } from './hooks/useCreateAdvertisement';
import styles from './index.module.scss';

const Create = () => {
  const { t } = useTranslation('advertisement');
  const { methods, onCancel, onSave } = useCreateAdvertisement();

  return (
    <CommunicationHeader
      title={t('form.title')}
      buttons={
        <Flex gap={8}>
          <Button
            icon={<Feather type="closeIcon" className={styles.closeIcon} />}
            onClick={onCancel}
          >
            {t('cancel')}
          </Button>
          <Button icon={<Feather type="saveIcon" />} onClick={onSave}>
            {t('save')}
          </Button>
        </Flex>
      }
    >
      <Form methods={methods} />
    </CommunicationHeader>
  );
};

export default Create;
