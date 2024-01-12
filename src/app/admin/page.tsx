'use client';
import React, { useState } from 'react';

import { IconFlatButton } from '@/components/buttons/IconFlatButton';
import Test from '@/components/form/test';
import TestCreatePatient from '@/components/form/TestCreatePatient';
import BaseModal from '@/components/modal/BaseModal';
import useModal from '@/hooks/useModal';
import FormHeaderText from '@/components/form/FormHeaderText';
import { FaUserDoctor } from 'react-icons/fa6';
import Information from '@/components/form/information';

const AdminPage = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const { Modal, openModal, closeModal } = useModal();

  return (
    <div className='w-full'>
      {/* <div className='flex justify-between  '>
        <h1>จัดการข้อมูลผู้ใช้ทั้งหมด </h1>
        <IconFlatButton onClick={openModal} name='เพิ่มข้อมูลผู้ใช้' />
      </div> */}
      <div style={{ display: 'flex', flexDirection: 'row' }}></div>

      {/* <Modal>
        <h1>This is your modal content</h1>
        <button onClick={closeModal}>Close Modal</button>
      </Modal> */}
      {/* <Modal>
        <FormHeaderText
          icon={FaUserDoctor}
          title='จัดการข้อมูลผู้ใช้ระบบ'
          useBigestHeader
        />
        <p>This is dynamic content inside the modal.</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal> */}

      {/* <button onClick={() => setIsOpen(true)}>Open Modal</button> */}
      <Test />
      <TestCreatePatient />
    </div>
  );
};

export default AdminPage;
