'use client';
import React from 'react';

import HeaderArticle from '@/components/common/HeaderArticle';

import Profile from '@/app/staff/components/profile/Profile';

const DoctorPage = () => {
  return (
    <div className='w-full'>
      <HeaderArticle title='โปรไฟล์' variant='h1' />
      <Profile />
    </div>
  );
};

export default DoctorPage;
