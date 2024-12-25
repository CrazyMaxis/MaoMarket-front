import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import { IShortCat } from 'models/ICat';
import styles from './index.module.scss';

interface ICatItemInfoProps {
  data: IShortCat;
}

export const CatItemInfo = ({ data }: ICatItemInfoProps) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/cat/${data.id}`);
  };

  return (
    <Flex gap={16} className={styles.container} vertical onClick={onClick}>
      <img src={data.photoUrl} alt="" />
      <Flex justify="space-between">
        <b>{data.name}</b>
        <div>{t(`gender.${data.gender}`)}</div>
      </Flex>
    </Flex>
  );
};
