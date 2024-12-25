import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Flex } from 'antd';
import NewsService from 'api/services/NewsService';
import { Roles } from 'enums/Roles';
import { getUser } from 'reduxApp/authentification';
import { Button, CommunicationHeader, Feather } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import useDataLoader from 'hooks/useDataLoader';
import { PATH } from 'routes/path';
import { Comments } from './components/Comments';
import { PostInfo } from './components/PostInfo';
import styles from './index.module.scss';

const View = () => {
  const { t } = useTranslation('news');
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const user = useAppSelector((state) => getUser(state));
  const { loadData, isLoading, res } = useDataLoader(NewsService.getNewsInfo);

  const onClickBack = () => {
    navigate(-1);
  };

  const onClickEdit = () => {
    navigate(`${location.pathname}/edit`);
  };

  const onClickDelete = async () => {
    if (id) {
      await NewsService.deletePost(id);
    }
    navigate(PATH.NEWS);
  };

  const allowedRoles = [
    Roles.NEWS_EDITOR,
    Roles.MODERATOR,
    Roles.ADMINISTRATOR,
  ];

  useEffect(() => {
    loadData(id);
  }, []);

  return (
    <CommunicationHeader
      title={<Button onClick={onClickBack}>{t('back')}</Button>}
      buttons={
        user &&
        allowedRoles.includes(user.role) && (
          <Flex gap={8}>
            <Button
              icon={<Feather type="deleteIcon" />}
              onClick={onClickDelete}
            >
              {t('delete')}
            </Button>
            <Button
              className={styles.buttonAdd}
              icon={<Feather type="pencil" />}
              onClick={onClickEdit}
            >
              {t('edit')}
            </Button>
          </Flex>
        )
      }
    >
      <Flex gap={48} vertical align="center">
        {res?.data && <PostInfo post={res?.data} />}
        <Comments />
      </Flex>
    </CommunicationHeader>
  );
};

export default View;
