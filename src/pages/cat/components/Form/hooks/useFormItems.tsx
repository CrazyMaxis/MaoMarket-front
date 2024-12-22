import { useTranslation } from 'react-i18next';
import { CollapseProps } from 'antd';
import { CatPhotos } from '../components/CatPhotos';
import { GeneralData } from '../components/GeneralData';
import { ParentsInfo } from '../components/ParentsInfo';

const useFormItems = () => {
  const { t } = useTranslation('cat', {
    keyPrefix: 'labelsCollapse',
  });

  const isEdit = window.location.pathname.includes('/edit');

  const keys: string[] = ['generalData', 'parentsInfo', 'catPhotos'];

  const formItems: CollapseProps['items'] = [
    {
      key: keys[0],
      label: t(keys[0]),
      children: <GeneralData isEdit={isEdit} />,
    },
    {
      key: keys[1],
      label: t(keys[1]),
      children: <ParentsInfo isEdit={isEdit} />,
    },
    {
      key: keys[2],
      label: t(keys[2]),
      children: <CatPhotos isEdit={isEdit} />,
    },
  ];

  return { formItems, keys };
};

export default useFormItems;
