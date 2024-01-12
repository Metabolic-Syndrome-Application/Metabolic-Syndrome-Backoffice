import { Dialog } from '@headlessui/react';
import React from 'react';
import { IoIosClose } from 'react-icons/io';

import { BaseModalProps } from '@/types/modal';

const BaseModal = ({ children, isOpen, closeModal }: BaseModalProps) => {
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div className='fixed inset-0 bg-black/20 ' aria-hidden='true' />

      <div className='fixed inset-0 z-20 h-screen w-full overflow-y-auto'>
        <div className='container mx-auto flex min-h-screen max-w-[1100px] items-center justify-center p-4 md:px-20'>
          <Dialog.Panel
            as='div'
            className='shadow-default-shadow rounded-xl bg-white p-4 md:px-6'
          >
            <div className='relative pb-4'>
              <IoIosClose
                className='text-default-gray absolute right-0 top-0 mb-4 flex h-6 w-6 cursor-pointer justify-end  md:h-8 md:w-8'
                onClick={closeModal}
              />
            </div>
            {/* {title && <h2 className='mb-2 text-2xl'>{title}</h2>}
            {description && <p className='mb-4'>{description}</p>} */}
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default BaseModal;
