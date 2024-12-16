import { useTranslation } from 'react-i18next';
import { CollapseProps } from 'antd';
import { CatsInfo } from '../components/CatsInfo';
import { GeneralData } from '../components/GeneralData';

export const useProfileInfoContentItems = () => {
  const { t } = useTranslation('profile', {
    keyPrefix: 'labelsCollapse',
  });

  const keys: string[] = ['generalData', 'catsInfo'];

  const infoItems: CollapseProps['items'] = [
    {
      key: keys[0],
      label: t(keys[0]),
      children: <GeneralData />,
    },
    {
      key: keys[1],
      label: t(keys[1]),
      children: <CatsInfo />,
    },
  ];

  return { infoItems, keys };
};
