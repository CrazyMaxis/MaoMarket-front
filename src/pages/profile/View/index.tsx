import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, CommunicationHeader, Feather } from 'components';
import { ProfileInfo } from './components/ProfileInfo';
import styles from './index.module.scss';

const View = () => {
  const { t } = useTranslation('profile');
  const navigate = useNavigate();
  const location = useLocation();

  const onClickEdit = () => {
    navigate(`${location.pathname}/edit`);
  };

  return (
    <CommunicationHeader
      title={t('title')}
      buttons={
        <Button
          className={styles.buttonAdd}
          icon={<Feather type="pencil" />}
          onClick={onClickEdit}
        >
          {t('edit')}
        </Button>
      }
    >
      <ProfileInfo />
    </CommunicationHeader>
  );
};

export default View;
