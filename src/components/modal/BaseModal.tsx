import { Dialog } from '@headlessui/react';
import React from 'react';
import { IoIosClose } from 'react-icons/io';

import { BaseModalProps } from '@/types/modal';

const BaseModal = ({ children, isOpen, closeModal }: BaseModalProps) => {
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div className='fixed inset-0 bg-black/20' aria-hidden='true' />
      <div className='fixed inset-0 z-50 h-full w-full overflow-y-auto'>
        <div className='container mx-auto flex max-h-full min-h-screen w-[90%] items-center justify-center p-4 md:px-6 lg:max-w-[1100px] lg:px-14'>
          <Dialog.Panel
            as='div'
            style={{ maxHeight: '92vh' }}
            className='shadow-default-shadow max-h-screen overflow-y-auto rounded-xl bg-white p-4 md:px-6'
          >
            <div className='relative pb-4'>
              <IoIosClose
                className='text-default-gray absolute right-0 top-0 mb-4 flex h-6 w-6 cursor-pointer justify-end  md:h-8 md:w-8'
                onClick={closeModal}
              />
            </div>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default BaseModal;
