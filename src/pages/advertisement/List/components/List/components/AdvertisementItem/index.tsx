import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import { Roles } from 'enums/Roles';
import { calculateAge } from 'helpers/calculateAge';
import { IAdvertisement } from 'models/IAdvertisement';
import { getUser } from 'reduxApp/authentification';
import { Button, Feather } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import styles from './index.module.scss';

interface IAdvertisementItemProps {
  data: IAdvertisement;
  handleDelete: (id: string) => void;
}

export const AdvertisementItem = ({
  data,
  handleDelete,
}: IAdvertisementItemProps) => {
  const { t } = useTranslation('advertisement');
  const navigate = useNavigate();
  const user = useAppSelector((state) => getUser(state));

  const onClick = () => {
    navigate(`/cat/${data.catId}`);
  };

  const onDelete = () => {
    handleDelete(data.id);
  };

  const onEdit = () => {
    navigate(`${data.id}/edit`);
  };

  return (
    <Flex gap={16} className={styles.container}>
      <Flex vertical gap={16} onClick={onClick}>
        <img src={data.photoUrl} alt="" />
        <Flex justify="space-between">
          <b>{data.name}</b>
          <div>{t(`gender.${data.gender}`)}</div>
        </Flex>
      </Flex>
      <Flex vertical gap={8}>
        <Flex gap={8}>
          <b>{t('price')}</b>
          <div>{data.price}$</div>
        </Flex>
        <Flex gap={8}>
          <b>{t('breed')}</b>
          <div>{data.breed}</div>
        </Flex>
        <Flex gap={8}>
          <b>{t('age')}</b>
          <div>{calculateAge(data.birthDate)}</div>
        </Flex>
        <Flex gap={8}>
          <b>{t('isCattery')}</b>
          <div>{t(`${data.isCattery}`)}</div>
        </Flex>
      </Flex>
      {user &&
        (user?.role === Roles.ADMINISTRATOR ||
          user?.role === Roles.MODERATOR ||
          user.id === data.userId) && (
          <Flex gap={8}>
            <Button icon={<Feather type="pencil" />} onClick={onEdit} />
            <Button icon={<Feather type="busketIcon" />} onClick={onDelete} />
          </Flex>
        )}
    </Flex>
  );
};
