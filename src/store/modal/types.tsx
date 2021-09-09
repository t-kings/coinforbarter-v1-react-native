export interface Props {
  children: JSX.Element;
  closeModal: () => void;
}

export type ModalContextType = {
  closeModal: () => void;
};
