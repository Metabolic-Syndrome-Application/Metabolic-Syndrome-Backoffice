'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';

import { InputText } from '@/components/form/InputText';
import {
  FormLoginProps,
  loginSchema,
} from '@/components/form/validation/form-validation';

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormLoginProps>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const submitData = (data: FormLoginProps) => {
    console.log('login page', data);
  };

  console.log('isValid', isValid);

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <div className=' flex h-screen items-center justify-center'>
        <div className='bg-default-blue/75 container mx-auto flex h-3/6	 max-w-3xl flex-col items-center justify-around gap-4 rounded-2xl p-4 md:flex-row md:gap-2'>
          <div className='flex flex-col items-center justify-center space-y-4 px-4'>
            <Image
              src='/assets/icons/logo.svg'
              alt='logo'
              width={150}
              height={150}
              className='w-10 rounded-full object-fill md:w-[150px]'
            />
            <h4 className='text-center uppercase text-white'>
              Metabolic Syndrome BackOffice
            </h4>
          </div>

          <div className='flex h-full w-full flex-col items-center justify-center gap-6 rounded-lg bg-white px-6 py-4 md:w-3/5'>
            <h2 className='text-center'>เข้าสู่ระบบ</h2>
            <InputText name='email' label='อีเมล' control={control} />
            <InputText
              name='password'
              label='รหัสผ่าน'
              control={control}
              showPasswordToggle
            />

            <button
              type='submit'
              className='bg-default-blue flex w-full items-center justify-center rounded-xl px-4 py-2  text-white'
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
