import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import { Button, CommunicationHeader, Feather } from 'components';
import { Form } from '../components/Form';
import { useCreateCat } from './hooks/useCreateCat';
import styles from './index.module.scss';

const Edit = () => {
  const { t } = useTranslation('cat');
  const { methods, onCancel, onSave } = useCreateCat();

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

export default Edit;
