'use client';
import React from 'react';

import Test from '@/components/form/test';
import TestCreatePatient from '@/components/form/test-create-patient';

const ManageUsers = () => {
  return (
    <div className='w-full'>
      <div className='flex justify-between  '>
        <h1>จัดการข้อมูลผู้ใช้ทั้งหมด</h1>
        <h1>เพิ่มข้อมูลผู้ใช้</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}></div>
      <Test />
      <TestCreatePatient />
    </div>
  );
};

export default ManageUsers;
