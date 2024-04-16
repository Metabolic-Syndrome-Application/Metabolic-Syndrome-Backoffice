'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUserDoctor } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import { IconFlatButton } from '@/components/buttons/IconFlatButton';
import HeaderArticle from '@/components/common/HeaderArticle';
import FormHeaderText from '@/components/form/components/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { RadioOption } from '@/components/form/RadioOption';
import { registerDoctorSchema } from '@/components/form/validation/UserValidator';

import { API_PATH } from '@/config/api';
import {
  dataOptions,
  medicalDepartment,
  medicalSpecialist,
} from '@/constant/user';
import { fetchAllUsers } from '@/redux/slices/usersSlice';

import { FormRegisterDoctorProps } from '@/types/admin';

const AdminCreateRegister = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();

  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch<any>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormRegisterDoctorProps>({
    mode: 'onChange',
    resolver: zodResolver(registerDoctorSchema),
  });

  const onSubmit = async (data: FormRegisterDoctorProps) => {
    const {
      role,
      username,
      password,
      passwordConfirm,
      prefix,
      firstName,
      lastName,
      gender,
      department,
      specialist,
    } = data;

    const userRole = session?.user?.role;

    try {
      // API call 1: Register
      const registerResponse = await axiosAuth.post(
        API_PATH.POST_REGISTER_OTHER,
        {
          role,
          username,
          password,
          passwordConfirm,
        }
      );
      const { id: userId, role: otherRole } = registerResponse.data.data.user;
      //console.log('Register API Response:', registerResponse.data.data.user);

      // API call 2: Create profile
      if (userRole === 'admin') {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const createProfileResponse = await axiosAuth.put(
          API_PATH.PUT_PROFILE_OTHER(otherRole, userId),
          {
            prefix,
            firstName,
            lastName,
            gender,
            department,
            specialist,
          }
        );
        if (createProfileResponse.status === 200) {
          //console.log('Create Profile API Response:', createProfileResponse);

          enqueueSnackbar('Register Success', { variant: 'success' });
          await dispatch(fetchAllUsers());
          closeModal();
          reset();
        }
      }
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      //console.error('Error:', error);
    }
  };

  return (
    <div className='w-full'>
      <HeaderArticle title='จัดการบัญชีผู้ใช้ระบบ (หมอ/พยาบาล)' variant='h1'>
        <IconFlatButton title='สร้างบัญชีผู้ใช้' onClick={openModal} />
      </HeaderArticle>

      <Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full'>
            <FormHeaderText
              icon={FaUserDoctor}
              title='จัดการข้อมูลผู้ใช้ระบบ'
              useBigestHeader
            />

            <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-5'>
              {/* section1 */}
              <div className='col-span-1 space-y-4 rounded-lg border p-2 md:col-span-2'>
                <FormHeaderText title='สร้างบัญชีผู้ใช้' />

                <RadioOption
                  name='role'
                  label='บทบาท'
                  control={control}
                  options={dataOptions.roleOptions}
                />

                <InputText name='username' label='อีเมล' control={control} />

                <InputText
                  name='password'
                  label='รหัสผ่าน'
                  control={control}
                  showPasswordToggle
                />
                <InputText
                  name='passwordConfirm'
                  label='ยืนยันรหัสผ่าน'
                  control={control}
                  showPasswordToggle
                />
              </div>

              {/* section2 */}
              <div className='col-span-1 space-y-4 rounded-lg border p-2 md:col-span-3'>
                <FormHeaderText title='ข้อมูลส่วนตัว' />

                <InputText name='prefix' label='คำนำหน้า' control={control} />
                <div className='flex space-x-4'>
                  <InputText
                    name='firstName'
                    label='ชื่อจริง'
                    control={control}
                  />
                  <InputText
                    name='lastName'
                    label='นามสกุล'
                    control={control}
                  />
                </div>
                <RadioOption
                  name='gender'
                  label='เพศ'
                  control={control}
                  options={dataOptions.genderOptions}
                />

                <InputDropdown
                  name='department'
                  control={control}
                  label='แผนก'
                  options={medicalDepartment}
                />
                <InputDropdown
                  name='specialist'
                  control={control}
                  label='ความเชี่ยวชาญ'
                  options={medicalSpecialist}
                />
              </div>
            </div>

            <div className='flex w-full justify-end space-x-3 py-4'>
              <ActionButton type='reset' variant='cancel' onClick={closeModal}>
                ยกเลิก
              </ActionButton>
              <ActionButton
                type='submit'
                variant='submit'
                disabled={!isDirty || Object.keys(errors).length > 0}
              >
                ยืนยันการสมัครบัญชี
              </ActionButton>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCreateRegister;
