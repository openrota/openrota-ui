import UniversableModal from '@app/components/UniversableModal/UniversableModal';
import React, { useCallback, useEffect, useState } from 'react'

// https://hesambayat.com/how-to-create-dialog-boxes-with-react-hook-and-react-context/

export type ModalObj = {
  title?: string;
  composite?: boolean;
  modalBody?: JSX.Element | null;
  modalFooter?: JSX.Element | null;
};

export type ModalClass = {
  setModal: (modalObj: ModalObj | null) => void;
  unSetModal: () => void;
};

export const ModalContext: React.Context<ModalClass | undefined> = React.createContext<ModalClass | undefined>(undefined);

const Modal = ({ modal, unSetModal }) => {
  return (
    <div>
      <UniversableModal unsetModal={unSetModal} modal={modal} />
    </div>
  )
}

const ModalProvider = props => {
  const [modal, setModal] = useState<ModalObj | null>(null);
  const unSetModal = useCallback(() => {
    setModal(null)
  }, [setModal])

  return (

    <ModalContext.Provider value={{ unSetModal, setModal }} {...props} >
      {props.children}
      {modal && <Modal modal={modal} unSetModal={unSetModal} />}
    </ModalContext.Provider>
  )
}

const useModal = () => {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a UserProvider')
  }

  return context
}
export { ModalProvider, useModal }