import { useTranslation } from 'react-i18next';
import { ButtonProps, Flex } from 'antd';
import { Button } from '../Button';
import { Feather } from '../Feather';
import styles from './index.module.scss';

interface IActionButtonsViewProps {
  onClose?: () => void;
  onExport?: () => void;
  onTransfer?: () => void;
  onRelease?: () => void;
  onArchive?: () => void;
  onAdd?: () => void;
  onEdit?: () => void;
  onCreateBasedOn?: () => void;
  drawerButtons?: boolean;
  additionalButtons?: ButtonProps[];
  isArchive?: boolean;
}

export const ActionButtonsView = ({
  onClose,
  onExport,
  onTransfer,
  onRelease,
  onAdd,
  onEdit,
  drawerButtons,
  additionalButtons,
  isArchive = false,
}: IActionButtonsViewProps) => {
  const { t } = useTranslation('', { keyPrefix: 'actionButtons' });

  return (
    <Flex gap={8}>
      {onClose && (
        <Button
          icon={<Feather type="closeIcon" className={styles.closeIcon} />}
          onClick={onClose}
          type={drawerButtons ? 'default' : 'primary'}
        >
          {t('close')}
        </Button>
      )}
      {additionalButtons?.map((buttonProps, idx) => (
        <Button {...buttonProps} key={idx} />
      ))}
      {onExport && (
        <Button
          icon={<Feather type="arrowDown" className={styles.exportIcon} />}
          onClick={onExport}
          type={'primary'}
          iconPosition="end"
        >
          {t('export')}
        </Button>
      )}
      {!isArchive && (
        <>
          {onTransfer && (
            <Button onClick={onTransfer} type={'primary'}>
              {t('transfer')}
            </Button>
          )}
          {onRelease && (
            <Button onClick={onRelease} type={'primary'}>
              {t('release')}
            </Button>
          )}
          {onAdd && (
            <Button
              className={styles.buttonAdd}
              icon={<Feather type="plusIcon" />}
              onClick={onAdd}
            >
              {t('add')}
            </Button>
          )}
          {onEdit && (
            <Button icon={<Feather type="pencil" />} onClick={onEdit}>
              {t('edit')}
            </Button>
          )}
        </>
      )}
    </Flex>
  );
};
