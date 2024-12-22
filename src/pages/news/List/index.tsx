import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import { Roles } from 'enums/Roles';
import { getUser } from 'reduxApp/authentification';
import { Button, CommunicationHeader, Feather } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import { FilterForm } from './components/FilterForm';
import { List } from './components/List';
import styles from './index.module.scss';

const ListNews = () => {
  const { t } = useTranslation('news');
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => getUser(state));

  const onClickAdd = () => {
    navigate(`${location.pathname}/create`);
  };

  const allowedRoles = [
    Roles.NEWS_EDITOR,
    Roles.MODERATOR,
    Roles.ADMINISTRATOR,
  ];

  return (
    <CommunicationHeader
      title={t('title')}
      buttons={
        user &&
        allowedRoles.includes(user.role) && (
          <Button
            className={styles.buttonAdd}
            icon={<Feather type="plusIcon" />}
            onClick={onClickAdd}
          >
            {t('add')}
          </Button>
        )
      }
    >
      <Flex gap={8} vertical>
        <FilterForm />
        <List />
      </Flex>
    </CommunicationHeader>
  );
};

export default ListNews;
