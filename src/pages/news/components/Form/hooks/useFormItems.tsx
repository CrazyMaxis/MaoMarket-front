import { useTranslation } from 'react-i18next';
import { CollapseProps } from 'antd';
import { GeneralData } from '../components/GeneralData';
import { PostImage } from '../components/PostImage';

const useFormItems = () => {
  const { t } = useTranslation('news', {
    keyPrefix: 'labelsCollapse',
  });

  const isEdit = window.location.pathname.includes('/edit');

  const keys: string[] = ['generalData', 'image'];

  const formItems: CollapseProps['items'] = [
    {
      key: keys[0],
      label: t(keys[0]),
      children: <GeneralData />,
    },
    {
      key: keys[1],
      label: t(keys[1]),
      children: <PostImage isEdit={isEdit} />,
    },
  ];

  return { formItems, keys };
};

export default useFormItems;
