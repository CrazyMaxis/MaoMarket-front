import { useTranslation } from 'react-i18next';
import { CollapseProps } from 'antd';
import { Roles } from 'enums/Roles';
import { getUser } from 'reduxApp/authentification';
import { useAppSelector } from 'hooks/customReduxHooks';
import { CatsInfo } from '../components/CatsInfo';
import { GeneralData } from '../components/GeneralData';

export const useProfileInfoContentItems = () => {
  const { t } = useTranslation('profile', {
    keyPrefix: 'labelsCollapse',
  });
  const user = useAppSelector((state) => getUser(state));

  const keys: string[] = ['generalData', 'catsInfo'];

  const infoItems: CollapseProps['items'] = [
    {
      key: keys[0],
      label: t(keys[0]),
      children: <GeneralData />,
    },
  ];

  if (user?.role !== Roles.NEWS_EDITOR) {
    infoItems.push({
      key: keys[1],
      label: t(keys[1]),
      children: <CatsInfo />,
    });
  }

  return { infoItems, keys };
};
