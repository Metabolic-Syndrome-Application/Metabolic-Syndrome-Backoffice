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

import { IconFlatButton } from '@/components/buttons/IconFlatButton';
import FormHeaderText from '@/components/form/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { RadioOption } from '@/components/form/RadioOption';
import {
  FormRegisterDoctorProps,
  registerDoctorSchema,
} from '@/components/form/validation/form-validation';

import {
  dataOptions,
  medicalDepartment,
  medicalSpecialist,
} from '@/constant/question';
import { fetchUsers } from '@/redux/slices/usersSlice';

const Test = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { enqueueSnackbar } = useSnackbar();

  const { Modal, openModal, closeModal } = useModal();

  const dispatch = useDispatch<any>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
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
    const userRole = session?.user?.role; // Extract the role from the session

    console.log('User Role:', userRole);

    try {
      // Check if the user is logged in
      if (!userRole) {
        console.log('User is not logged in.');

        return;
      }

      // API call 1: Register
      const registerResponse = await axiosAuth.post(
        '/api/auth/register/other',
        {
          role,
          username,
          password,
          passwordConfirm,
        }
      );
      const { id: userId, role: otherRole } = registerResponse.data.data.user;

      console.log('Register API Response:', registerResponse.data.data.user);
      // Assuming only an admin can create a profile
      if (userRole === 'admin') {
        // API call 2: Create profile
        const createProfileResponse = await axiosAuth.put(
          `http://localhost:8000/api/user/profile/${otherRole}/${userId}`,
          {
            prefix,
            firstName,
            lastName,
            gender,
            department,
            specialist,
          }
        );

        console.log('Create Profile API Response:', createProfileResponse);
        enqueueSnackbar('Register Success', { variant: 'success' });
        dispatch(fetchUsers());
      } else {
        // Handle the case where the user is not an admin
        console.log('User is not authorized to create a profile.');
      }
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-full'>
      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h1 className='text-balance'>จัดการข้อมูลผู้ใช้ทั้งหมด</h1>
        <IconFlatButton
          title='เพิ่มข้อมูลผู้ใช้'
          //icon={Bs1Square}
          onClick={openModal}
        />
      </article>
      <Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=''>
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

            <div className='flex w-full justify-end space-x-3 p-4'>
              <button
                onClick={closeModal}
                className='rounded-xl bg-gray-50 px-4 py-4'
              >
                cancel
              </button>
              <button
                type='submit'
                className='flex items-center rounded-xl bg-blue-400 px-4 py-2'
              >
                submit
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Test;
