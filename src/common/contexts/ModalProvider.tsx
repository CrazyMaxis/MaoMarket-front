import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { IModalProps, Modal } from 'components';

export type ModalProviderProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalProps: (props: IModalProps) => void;
  modalProps: IModalProps;
};

export const ModalContext = createContext<ModalProviderProps>({
  isOpen: false,
  setIsOpen: () => {},
  setModalProps: () => {},
  modalProps: {},
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<IModalProps>({});

  const setModal = (props: IModalProps) => {
    setModalProps(props);
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen, modalProps, setModalProps: setModal }}
    >
      {children}
      <Modal {...modalProps} open={isOpen} />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
