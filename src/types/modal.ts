import { ReactNode } from 'react';

//Modal
export type BaseModalProps = {
  children: ReactNode;
  isOpen?: boolean;
  closeModal: () => void;
  onClose?: () => void;
};
