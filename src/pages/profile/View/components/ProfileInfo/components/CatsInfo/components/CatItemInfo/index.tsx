import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import { IUserCat } from 'models/ICat';
import styles from './index.module.scss';

interface ICatItemInfoProps {
  data: IUserCat;
}

export const CatItemInfo = ({ data }: ICatItemInfoProps) => {
  const { t } = useTranslation('common');

  return (
    <Flex gap={16} className={styles.container} vertical>
      <img src={data.photoUrl} alt="" />
      <Flex justify="space-between">
        <b>{data.name}</b>
        <div>{t(`gender.${data.gender}`)}</div>
      </Flex>
    </Flex>
  );
};
