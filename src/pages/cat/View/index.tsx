import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Flex } from 'antd';
import CatService from 'api/services/CatService';
import { ICat } from 'models/ICat';
import { Button, CommunicationHeader, Feather } from 'components';
import { PATH } from 'routes/path';
import { CatInfo } from './components/CatInfo';
import styles from './index.module.scss';

const View = () => {
  const { t } = useTranslation('cat');
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [cat, setCat] = useState<ICat>();

  const onClickEdit = () => {
    navigate(`${location.pathname}/edit`);
  };

  const onClickDelete = async () => {
    if (id) {
      await CatService.deleteCat(id);
    }
    navigate(PATH.PROFILE);
  };

  const fetchData = async () => {
    if (id) {
      const response = await CatService.getCatInfo(id);
      setCat(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <CommunicationHeader
      title={t('title')}
      buttons={
        <Flex gap={8}>
          <Button icon={<Feather type="deleteIcon" />} onClick={onClickDelete}>
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
      }
    >
      {cat && <CatInfo cat={cat} />}
    </CommunicationHeader>
  );
};

export default View;
