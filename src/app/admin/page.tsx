'use client';
import React from 'react';

import useModal from '@/hooks/useModal';

import Test from '@/components/form/test';

import ManageUserTable from '@/app/admin/components/manage-user-table';
import EditForm from '@/app/admin/components/EditForm';

const AdminPage = () => {
  const { Modal, openModal, closeModal } = useModal();

  return (
    <div className='w-full'>
      {/* <TextButton>hey</TextButton>
      <Button leftIcon={FiPlusCircle}>hh</Button> */}
      {/* <button onClick={() => setIsOpen(true)}>Open Modal</button> */}
      <Test />

      <ManageUserTable />
      {/* <TestCreatePatient /> */}
    </div>
  );
};

export default AdminPage;
