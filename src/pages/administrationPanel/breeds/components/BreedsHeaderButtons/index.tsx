import { ActionButtonsView } from 'components';
import { DrawerContentCreate } from '../DrawerContentCreate';
import useInterestsGroupsActions from './hooks/useInterestsGroupActions';

const BreedsHeaderButtons = () => {
  const { isOpenCreate, onClickCreate, onCloseCreate } =
    useInterestsGroupsActions();

  return (
    <>
      <ActionButtonsView onAdd={onClickCreate} />
      <DrawerContentCreate isOpen={isOpenCreate} onClose={onCloseCreate} />
    </>
  );
};

export default BreedsHeaderButtons;
