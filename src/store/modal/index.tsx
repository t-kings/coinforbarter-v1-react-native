import React, {createContext, FC} from 'react';
import {ModalContextType, Props} from './types';

const modalContext: ModalContextType = {
  closeModal: () => {},
};

export const ModalContext = createContext<ModalContextType>(modalContext);

export const ModalProvider: FC<Props> = ({children, closeModal}) => {
  return (
    <ModalContext.Provider value={{closeModal}}>
      {children}
    </ModalContext.Provider>
  );
};
