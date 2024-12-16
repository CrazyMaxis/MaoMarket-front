import { Collapse } from 'components';
import { useProfileInfoContentItems } from './hooks/useProfileInfoContentItems';

export const ProfileInfo = () => {
  const { keys, infoItems } = useProfileInfoContentItems();

  return <Collapse items={infoItems} defaultActiveKey={keys} />;
};
