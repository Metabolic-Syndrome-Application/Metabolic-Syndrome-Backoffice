import Image from 'next/image';
import React from 'react';

const LoginPage = () => {
  return (
    <div className='bg-dark-blue flex items-center justify-around space-x-4 rounded-2xl bg-opacity-75'>
      <div className='flex flex-col items-center justify-center px-4'>
        <Image
          src='/assets/icons/logo.svg'
          alt=''
          width={44}
          height={44}
          className='rounded-full'
        />
        <h3 className='text-center text-white'>Metabolic Syndrome</h3>
      </div>

      <div className='m-2 flex flex-col  items-center justify-center rounded-xl bg-white py-4'>
        <h1 className='text-center'>เข้าสู่ระบบ</h1>
        <p>เข้าสู่ระบบ</p>
        <p>รหัสผ่าน</p>
        <button
          type='submit'
          className='flex  rounded-xl bg-blue-400 px-4 py-2'
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
