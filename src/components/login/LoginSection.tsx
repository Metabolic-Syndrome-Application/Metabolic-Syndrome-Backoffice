'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';

import { InputText } from '@/components/form/InputText';
import {
  FormLoginProps,
  loginSchema,
} from '@/components/form/validation/form-validation';

type LoginProps = {
  callbackUrl?: string;
  error?: string;
};

const LoginSection = (props: LoginProps) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginProps>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormLoginProps, e: any) => {
    //e.preventDefault();
    const { username, password } = data;
    //if redirect: true, enqueueSnackbar success isn't to show
    try {
      const res = await signIn('credentials', {
        username: username,
        password,
        redirect: false,
        callbackUrl: props.callbackUrl,
      });
      // Check if login is successful
      if (res && res.ok) {
        enqueueSnackbar('Login Success', { variant: 'success' });
        router.push('/'); // Redirect after successful login
      } else {
        enqueueSnackbar('ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง', {
          variant: 'error',
        });
      }
      //console.log('login', res);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data) {
        enqueueSnackbar(error.response.data, { variant: 'error' });
      }
    }
  };

  //enqueueSnackbar can't be show
  // useEffect(() => {
  //   if (props.error) {
  //     enqueueSnackbar('Login failed. Please try again.', { variant: 'error' });
  //   }
  // }, [props.error, enqueueSnackbar]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' flex h-screen items-center justify-center'>
          <div className='bg-default-blue/75 container mx-auto flex h-fit max-w-3xl flex-col items-center justify-around gap-4 rounded-2xl p-4  md:flex-row md:gap-2'>
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
              {!!props.error && (
                <p className='rounded-lg bg-red-100 px-1 text-center text-red-600'>
                  ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง
                </p>
              )}
              <InputText name='username' label='อีเมล' control={control} />
              <InputText
                name='password'
                label='รหัสผ่าน'
                control={control}
                showPasswordToggle
              />

              <button
                type='submit'
                className='bg-default-blue flex w-full items-center justify-center rounded-xl px-4 py-3 font-medium  text-white'
              >
                เข้าสู่ระบบ
              </button>
              {/* <Link
                href={props.callbackUrl ?? '/'}
                className='w-28 rounded-md border border-red-600 py-2 text-center text-red-600 transition hover:border-transparent hover:bg-red-600 hover:text-white active:scale-95'
              >
                Cancel
              </Link> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginSection;
