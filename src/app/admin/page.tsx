'use client';
import React, { useState } from 'react';

import { IconButton } from '@/components/buttons/icon-button';
import Test from '@/components/form/test';
import TestCreatePatient from '@/components/form/TestCreatePatient';
import BaseModal from '@/components/modal/BaseModal';

const ManageUserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between  '>
        <h1>จัดการข้อมูลผู้ใช้ทั้งหมด </h1>
        <IconButton onClick={openModal} name='เพิ่มข้อมูลผู้ใช้' />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}></div>

      <BaseModal open={isModalOpen} onClose={closeModal}>
        {/* Your modal content here */}
        <h1>This is your modal content</h1>
        <button onClick={closeModal}>Close Modal</button>
      </BaseModal>

      {/* <button onClick={() => setIsOpen(true)}>Open Modal</button> */}
      <Test />
      <TestCreatePatient />
    </div>
  );
};

export default ManageUserPage;
