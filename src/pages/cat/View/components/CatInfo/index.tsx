import { ICat } from 'models/ICat';
import { Collapse } from 'components';
import { useCatInfoContentItems } from './hooks/useCatInfoContentItems';

interface ICatInfoProps {
  cat: ICat;
}

export const CatInfo = ({ cat }: ICatInfoProps) => {
  const { keys, infoItems } = useCatInfoContentItems({ cat });

  return <Collapse items={infoItems} defaultActiveKey={keys} />;
};
