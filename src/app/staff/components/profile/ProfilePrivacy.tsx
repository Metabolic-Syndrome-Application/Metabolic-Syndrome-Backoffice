import ActionButton from '@/components/buttons/ActionButton';
import FormHeaderText from '@/components/form/FormHeaderText';
import { InputText } from '@/components/form/InputText';
import React from 'react';
import { useForm } from 'react-hook-form';

const ProfilePrivacy = () => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async () => {
    //console.log(onSubmit)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='shadow-light-shadow flex h-full w-full flex-col gap-4 rounded-xl bg-white p-4 md:w-[600px] md:px-6 md:pb-10'>
        <FormHeaderText title='ข้อมูลการเข้าสู่ระบบ' useBigestHeader />


        <div className='flex flex-col space-y-6'>
          <InputText name='currentPassword' control={control} label='รหัสผ่านปัจจุบัน'></InputText>
          <InputText name='newPassword' control={control} label='รหัสผ่านใหม่'></InputText>
          <InputText name='confirmPassword' control={control} label='ยืนยันรหัสผ่านใหม่'></InputText>

        </div>
        <div className='flex w-full justify-end space-x-3 py-4'>

          <ActionButton
            type='submit'
            variant='submit'
          >
            ยืนยัน
          </ActionButton>
        </div>
      </div>
    </form>
  );
};

export default ProfilePrivacy;
