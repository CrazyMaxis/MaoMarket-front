import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Flex, Spin } from 'antd';
import CatService from 'api/services/CatService';
import UserService from 'api/services/UserService';
import { ROLES_OPTIONS } from 'constants/common-options';
import { IUserCat } from 'models/ICat';
import { IUserInstance } from 'models/IUserInstance';
import { CatItemInfo } from 'pages/profile/View/components/ProfileInfo/components/CatsInfo/components/CatItemInfo';
import { toggleRefresh } from 'reduxApp/refsreshSlice';
import { Button, Select } from 'components';
import useDataLoader from 'hooks/useDataLoader';
import styles from './index.module.scss';

interface IDrawerContentProps {
  user: IUserInstance;
}

export const DrawerContent = ({ user }: IDrawerContentProps) => {
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'assignRoles.drawer',
  });
  const dispatch = useDispatch();
  const [isBlocked, setIsBlocked] = useState(user.isBlocked);

  const { loadData, isLoading, res } = useDataLoader(CatService.getUserCats);

  useEffect(() => {
    loadData(user.id);
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  const onChange = (role: string) => {
    UserService.changeRole(user.id, role);
    dispatch(toggleRefresh());
  };

  const onBlock = () => {
    UserService.blockUser(user.id);
    setIsBlocked(true);
    dispatch(toggleRefresh());
  };

  const onUnblock = () => {
    UserService.unblockUser(user.id);
    setIsBlocked(false);
    dispatch(toggleRefresh());
  };

  return (
    <Flex gap={24} vertical>
      <Flex gap={8}>
        <b>{t('fullname')}</b>
        <div>{user.name}</div>
      </Flex>

      <Flex gap={8}>
        <b>{t('email')}</b>
        <div>{user.email}</div>
      </Flex>

      <Flex gap={8}>
        <b>{t('phoneNumber')}</b>
        <div>{!user.phoneNumber ? t('dontHave') : user.phoneNumber}</div>
      </Flex>

      <Flex gap={8}>
        <b>{t('telegramUsername')}</b>
        <div>
          {!user.telegramUsername ? t('dontHave') : user.telegramUsername}
        </div>
      </Flex>

      <Flex gap={8} align="center">
        <b>{t('role')}</b>
        <Select
          defaultValue={user.role}
          options={ROLES_OPTIONS()}
          className={styles.select}
          onChange={(value) => onChange(value)}
        />
      </Flex>

      <Flex gap={8} align="center">
        <b>{t('isBlocked')}</b>
        <div>{t(`${isBlocked}`)}</div>
        {isBlocked ? (
          <Button onClick={onUnblock}>{t('unblock')}</Button>
        ) : (
          <Button onClick={onBlock}>{t('block')}</Button>
        )}
      </Flex>

      <Flex gap={8}>
        <b>{t('cats')}</b>
        {res?.data.length === 0 && <div>{t('noCats')}</div>}
      </Flex>

      <Flex align="center" gap={24} wrap>
        {res?.data.map((cat: IUserCat) => (
          <CatItemInfo data={cat} key={cat.id} />
        ))}
      </Flex>
    </Flex>
  );
};
