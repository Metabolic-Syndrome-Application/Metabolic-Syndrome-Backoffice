'use client';
import React from 'react';

import Test from '@/components/form/test';
import TestCreatePatient from '@/components/form/test-create-patient';
import DeleteBtn from '@/components/buttons/delete-button';
import DeleteButton from '@/components/buttons/delete-button';

const ManageUserPage = () => {
  return (
    <div className='w-full'>
      <div className='flex justify-between  '>
        <h1>จัดการข้อมูลผู้ใช้ทั้งหมด</h1>
        <h1>เพิ่มข้อมูลผู้ใช้</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}></div>
      <DeleteButton />
      <Test />
      <TestCreatePatient />
    </div>
  );
};

export default ManageUserPage;
