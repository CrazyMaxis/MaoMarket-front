import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import { Button, CommunicationHeader, Feather } from 'components';
import { Form } from '../components/Form';
import { useCreatePost } from './hooks/useCreatePost';
import styles from './index.module.scss';

const Create = () => {
  const { t } = useTranslation('news');
  const { methods, onCancel, onSave } = useCreatePost();

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
