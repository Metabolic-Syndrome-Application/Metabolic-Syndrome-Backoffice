'use client';
import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

export type BaseModalProps = {
  children: React.ReactNode;
  open: boolean;
  // onClose?: () => unknown;
  onClose(value: boolean): void;
  //closeModal: () => void;
};

const BaseModal = ({ children, open, onClose }: BaseModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='modal'>
      <Dialog open={open} onClose={onClose}>
        <div className='fixed inset-0 bg-black/20 ' aria-hidden='true' />

        <div className='fixed inset-0 z-20 h-screen w-full overflow-y-auto'>
          <div className='container mx-auto flex min-h-screen max-w-[1100px] items-center justify-center p-4'>
            <Dialog.Panel
              as='div'
              className='shadow-default-shadow rounded-xl bg-white p-4'
            >
              <div className='relative pb-4'>
                <IoIosClose
                  className='text-default-gray absolute right-0 top-0 mb-4 flex h-6 w-6 cursor-pointer justify-end  md:h-8 md:w-8'
                  //onClick={onClose}
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <Dialog.Title>
                {/* <FormHeaderText
                  icon={FaUserDoctor}
                  title='จัดการข้อมูลคนไข้'
                  useBigestHeader
                /> */}
              </Dialog.Title>
              <Dialog.Description>
                {/* Test component or content */}
                {/* Description */}
                {children}
              </Dialog.Description>

              <button onClick={() => setIsOpen(false)}>Close</button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>

      {/* <button onClick={() => setOpen(true)}>Open Modal</button> */}
    </div>
  );
};

export default BaseModal;
