'use client';

import BaseModal from '@/components/modal/BaseModal';
import { BaseModalProps } from '@/types/modal';
import { useState, useCallback } from 'react';

const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const Modal = useCallback(
    ({ children }: Omit<BaseModalProps, 'isOpen' | 'closeModal'>) => (
      <BaseModal isOpen={open} closeModal={closeModal}>
        {children}
      </BaseModal>
    ),
    [open]
  );

  return { Modal, openModal, closeModal, isOpen: open };
};

export default useModal;
