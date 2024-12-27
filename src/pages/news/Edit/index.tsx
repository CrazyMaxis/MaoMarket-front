import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import { Button, CommunicationHeader, Feather } from 'components';
import { Form } from '../components/Form';
import { useEditPost } from './hooks/useEditPost';
import styles from './index.module.scss';

const Edit = () => {
  const { t } = useTranslation('news');
  const { methods, onCancel, onSave, isLoading } = useEditPost();

  return (
    <CommunicationHeader
      title={t('form.titleEdit')}
      isLoading={isLoading}
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
