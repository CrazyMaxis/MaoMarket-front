import { useState } from 'react';

const useInterestsGroupsActions = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const onClickCreate = () => {
    setIsOpenCreate(true);
  };

  const onCloseCreate = () => {
    setIsOpenCreate(false);
  };

  return { isOpenCreate, onClickCreate, onCloseCreate };
};

export default useInterestsGroupsActions;
