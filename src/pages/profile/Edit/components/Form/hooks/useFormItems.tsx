import { useTranslation } from 'react-i18next';
import { CollapseProps } from 'antd';
import { GeneralData } from '../components/GeneralData';

const useFormItems = () => {
  const { t } = useTranslation('profile', {
    keyPrefix: 'labelsCollapse',
  });

  const keys: string[] = ['generalData'];

  const formItems: CollapseProps['items'] = [
    {
      key: keys[0],
      label: t(keys[0]),
      children: <GeneralData />,
    },
  ];

  return { formItems, keys };
};

export default useFormItems;
