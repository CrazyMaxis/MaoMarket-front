import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Spin } from 'antd';
import CatService from 'api/services/CatService';
import { IShortCat } from 'models/ICat';
import { getStateAuthLoading, getUser } from 'reduxApp/authentification';
import { Button, Feather } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import { PATH } from 'routes/path';
import { CatItemInfo } from './components/CatItemInfo';
import styles from './index.module.scss';

export const CatsInfo = () => {
  const user = useAppSelector((state) => getUser(state));
  const isLoading = useAppSelector((state) => getStateAuthLoading(state));
  const navigate = useNavigate();
  const [cats, setCats] = useState<IShortCat[]>([]);

  const onClickAddCat = () => {
    navigate(`${PATH.CAT}/create`);
  };

  const fetchCats = async () => {
    if (user?.id) {
      const response = await CatService.getUserCats(user.id);
      setCats(response.data);
    }
  };

  useEffect(() => {
    if (!isLoading) fetchCats();
  }, [isLoading]);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Flex align="center" gap={24} wrap>
      {cats.map((cat) => (
        <CatItemInfo data={cat} key={cat.id} />
      ))}
      <Button
        className={styles.addCatButton}
        icon={<Feather type="plusIcon" />}
        onClick={onClickAddCat}
      />
    </Flex>
  );
};
