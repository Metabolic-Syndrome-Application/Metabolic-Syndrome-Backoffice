'use client';
import React from 'react';

import Profile from '@/app/staff/components/profile/Profile';

const StaffPage = () => {
  return (
    <div>
      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h1 className='text-balance'>ประวัติส่วนตัว</h1>
      </article>
      <Profile />
    </div>
  );
};

export default StaffPage;
