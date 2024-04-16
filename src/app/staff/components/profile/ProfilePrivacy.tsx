import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import ActionButton from '@/components/buttons/ActionButton';
import FormHeaderText from '@/components/form/components/FormHeaderText';
import { InputText } from '@/components/form/InputText';
import { changePasswordSchema } from '@/components/form/validation/UserValidator';

import { API_PATH } from '@/config/api';

import { FormChangePasswordProps } from '@/types/auth';

const ProfilePrivacy = () => {
  const axiosAuth = useAxiosAuth();
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormChangePasswordProps>({
    mode: 'onChange',
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: FormChangePasswordProps) => {
    const { currentPassword, newPassword, confirmPassword } = data;
    try {
      // Combine data into a single object
      const data = { currentPassword, newPassword, confirmPassword };

      await axiosAuth.post(API_PATH.POST_CHANGE_PASSWORD, data);

      enqueueSnackbar('Change password success', { variant: 'success' });
      reset();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data) {
        enqueueSnackbar(error.response.data, { variant: 'error' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='shadow-light-shadow flex h-full w-full flex-col gap-4 rounded-lg bg-white p-4 md:min-w-[450px] md:px-6  md:pb-10 lg:w-[600px]'>
        <FormHeaderText title='ข้อมูลการเข้าสู่ระบบ' useBigestHeader />

        <div className='flex flex-col space-y-6'>
          <InputText
            name='currentPassword'
            control={control}
            label='รหัสผ่านปัจจุบัน'
          />
          <InputText
            name='newPassword'
            control={control}
            label='รหัสผ่านใหม่'
            showPasswordToggle
          />
          <InputText
            name='confirmPassword'
            control={control}
            label='ยืนยันรหัสผ่านใหม่'
            showPasswordToggle
          />
        </div>
        <div className='flex w-full justify-end space-x-3 py-4'>
          <ActionButton
            type='submit'
            variant='submit'
            disabled={!isDirty || Object.keys(errors).length > 0}
          >
            ยืนยันการเปลี่ยนรหัสผ่าน
          </ActionButton>
        </div>
      </div>
    </form>
  );
};

export default ProfilePrivacy;
