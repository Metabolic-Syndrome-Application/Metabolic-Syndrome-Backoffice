'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUserDoctor } from 'react-icons/fa6';

import { axiosAuth } from '@/lib/axios';

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

const Test = () => {
  const { data: session } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormRegisterDoctorProps>({
    mode: 'onChange',
    resolver: zodResolver(registerDoctorSchema),
  });

  // const submitData = (data: FormRegisterDoctorProps) => {
  //   console.log('it worked', data);
  // };

  //console.log('isValid', isValid);

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
        // Handle the case where the user is not logged in
        return;
      }

      // API call 1: Register
      const registerResponse = await axiosAuth.post(
        'http://localhost:8000/api/auth/register/other',
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
        const createProfileResponse = await axiosAuth.post(
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
        console.log('Create Profile API Response:', createProfileResponse.data);

        // Do something after the API call
      } else {
        // Handle the case where the user is not an admin
        console.log('User is not authorized to create a profile.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='shadow-default-shadow flex h-full w-full max-w-[1100px] flex-col items-center justify-center rounded-xl bg-white p-8 '>
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
              <InputText name='firstName' label='ชื่อจริง' control={control} />
              <InputText name='lastName' label='นามสกุล' control={control} />
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

        <div className='flex w-full justify-end p-4'>
          <button
            type='submit'
            className='flex  rounded-xl bg-blue-400 px-4 py-2'
          >
            submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Test;
