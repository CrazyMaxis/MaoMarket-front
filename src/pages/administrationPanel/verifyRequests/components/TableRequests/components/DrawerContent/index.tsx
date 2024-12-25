import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Flex, Spin } from 'antd';
import CatService from 'api/services/CatService';
import UserService from 'api/services/UserService';
import { IUserCat } from 'models/ICat';
import { IUserInstance } from 'models/IUserInstance';
import { CatItemInfo } from 'pages/profile/View/components/ProfileInfo/components/CatsInfo/components/CatItemInfo';
import { toggleRefresh } from 'reduxApp/refsreshSlice';
import { Button } from 'components';
import useDataLoader from 'hooks/useDataLoader';

interface IDrawerContentProps {
  user: IUserInstance;
}

export const DrawerContent = ({ user }: IDrawerContentProps) => {
  const { t } = useTranslation('administrationPanel', {
    keyPrefix: 'assignRoles.drawer',
  });
  const dispatch = useDispatch();

  const { loadData, isLoading, res } = useDataLoader(CatService.getUserCats);

  const onApprove = () => {
    UserService.approveVerifyRequest(user.id).then(() =>
      dispatch(toggleRefresh()),
    );
  };

  const onReject = () => {
    UserService.rejectVerifyRequest(user.id).then(() =>
      dispatch(toggleRefresh()),
    );
  };

  useEffect(() => {
    loadData(user.id);
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Flex gap={24} vertical>
      <Flex gap={16}>
        <Button onClick={onApprove}>{t('approve')}</Button>
        <Button onClick={onReject}>{t('reject')}</Button>
      </Flex>

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
        <b>{t('isBlocked')}</b>
        <div>{t(`${user.isBlocked}`)}</div>
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
