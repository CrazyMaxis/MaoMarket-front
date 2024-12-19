import { useTranslation } from 'react-i18next';
import { CollapseProps } from 'antd';
import { ICat } from 'models/ICat';
import { CatPhotos } from '../components/CatPhotos';
import { GeneralData } from '../components/GeneralData';
import { PedigreeInfo } from '../components/PedigreeInfo';

interface IUseCatInfoContentItemsParams {
  cat: ICat;
}

export const useCatInfoContentItems = ({
  cat,
}: IUseCatInfoContentItemsParams) => {
  const { t } = useTranslation('cat', {
    keyPrefix: 'labelsCollapse',
  });

  const keys: string[] = ['generalData', 'catPhotos', 'pedigreeInfo'];

  const infoItems: CollapseProps['items'] = [
    {
      key: keys[0],
      label: t(keys[0]),
      children: <GeneralData cat={cat} />,
    },
    {
      key: keys[1],
      label: t(keys[1]),
      children: <CatPhotos cat={cat} />,
    },
    {
      key: keys[2],
      label: t(keys[2]),
      children: <PedigreeInfo cat={cat} />,
    },
  ];

  return { infoItems, keys };
};
