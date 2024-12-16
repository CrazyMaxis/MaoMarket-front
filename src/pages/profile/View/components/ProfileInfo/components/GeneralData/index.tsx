import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserService from 'api/services/UserService';
import { Roles } from 'enums/Roles';
import { getUser } from 'reduxApp/authentification';
import { Button, CollapseInfoBlock } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';

export const GeneralData = () => {
  const { t } = useTranslation('profile', {
    keyPrefix: 'view.generalData',
  });
  const { t: tCommon } = useTranslation('common');
  const user = useAppSelector((state) => getUser(state));
  const [isVerify, setIsVerify] = useState(user?.verificationRequested);

  const onClickVerify = () => {
    UserService.requestVerification();
    setIsVerify(true);
  };

  return (
    <CollapseInfoBlock
      infoItems={[
        {
          title: t('fullname'),
          value: user?.name,
        },
        {
          title: t('email'),
          value: user?.email,
        },
        {
          title: t('role'),
          value: tCommon(`role.${user?.role}`),
        },
        ...(user?.role === Roles.USER
          ? [
              {
                title: t('isVerify'),
                value: isVerify ? (
                  t('verifyRequestAlready')
                ) : (
                  <Button onClick={onClickVerify}>{t('verifyRequest')}</Button>
                ),
              },
            ]
          : []),
      ]}
    />
  );
};
