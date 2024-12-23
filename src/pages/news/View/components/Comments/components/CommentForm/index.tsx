import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import { Button, TextAreaControl } from 'components';
import { useCreateComment } from './hooks/useCreateComment';
import styles from './index.module.scss';

interface ICommentFormProps {
  handleCommentCreate: () => void;
}

export const CommentForm = ({ handleCommentCreate }: ICommentFormProps) => {
  const { t } = useTranslation('news', { keyPrefix: 'comment' });
  const { methods, onCreate } = useCreateComment({ handleCommentCreate });

  return (
    <FormProvider {...methods}>
      <Flex
        gap={16}
        align="center"
        justify="space-between"
        className={styles.container}
      >
        <TextAreaControl
          className={styles.textArea}
          name="body"
          textAreaProps={{
            placeholder: t('inputBody'),
          }}
        />
        <Button onClick={onCreate}>{t('send')}</Button>
      </Flex>
    </FormProvider>
  );
};
