'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getSession, signIn, signOut } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';

import ActionButton from '@/components/buttons/ActionButton';
import { InputText } from '@/components/form/InputText';
import { loginSchema } from '@/components/form/validation/UserValidator';

import { FormLoginProps } from '@/types/auth';

type LoginProps = {
  callbackUrl?: string;
  error?: string;
};

const LoginSection = (props: LoginProps) => {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<FormLoginProps>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormLoginProps) => {
    const { username, password } = data;
    try {
      const res = await signIn('credentials', {
        username: username,
        password,
        redirect: false,
        callbackUrl: props.callbackUrl,
      });

      // Check if login is successful
      if (res && res.ok) {
        // Check role session
        const session = await getSession();
        if (session?.user?.role === 'patient') {
          // If the user's role is 'patient', deny access
          enqueueSnackbar('Access denied. Please try again.', {
            variant: 'error',
          });
          await signOut();
        } else {
          // Other roles, proceed with login
          enqueueSnackbar('Login Success', { variant: 'success' });
          router.push('/');
        }
      } else {
        enqueueSnackbar('Invalid credentials. Please try again.', {
          variant: 'error',
        });
      }
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex h-screen w-full items-center justify-center p-2'>
        <div className='bg-default-blue/75 container mx-auto flex h-fit max-w-3xl flex-col items-center justify-around gap-4 rounded-2xl p-4 md:h-[400px] md:flex-row md:gap-2'>
          <div className='flex flex-col items-center justify-center space-y-4 px-4'>
            <Image
              src='/assets/icons/logo.svg'
              priority={true}
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
              type='password'
            />
            <ActionButton type='submit' variant='submit' className='w-full'>
              เข้าสู่ระบบ
            </ActionButton>
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
  );
};

export default LoginSection;
