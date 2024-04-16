import { Dialog } from '@headlessui/react';
import { IoIosClose } from 'react-icons/io';

import { BaseModalProps } from '@/types/modal';

const BaseModal = ({ children, isOpen, closeModal }: BaseModalProps) => {
  return (
    <Dialog open={isOpen} className='relative z-50' onClose={closeModal}>
      <div className='fixed inset-0 bg-black/20' aria-hidden='true' />
      <div className='fixed inset-0 flex h-full w-full overflow-y-auto'>
        <div className='container mx-auto flex max-h-full min-h-screen w-[90%] items-center justify-center p-4 md:px-6 lg:max-w-[1100px] lg:px-14'>
          <Dialog.Panel
            as='div'
            //style={{ maxHeight: '100vh' }}
            className='shadow-default-shadow max-h-full overflow-y-auto rounded-xl bg-white p-4 md:px-6'
          >
            <Dialog.Title
              as='h3'
              className='text-lg font-medium leading-6 text-gray-900'
            >
              <div className='flex items-end justify-end'>
                <IoIosClose
                  className='text-default-gray h-6 w-6 cursor-pointer md:h-8 md:w-8'
                  onClick={closeModal}
                />
              </div>
            </Dialog.Title>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default BaseModal;
