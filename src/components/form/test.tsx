'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUserDoctor } from 'react-icons/fa6';
import z, { ZodType } from 'zod';

import FormHeaderText from '@/components/form/form-header-text';
import { InputDropdown } from '@/components/form/input-dropdown';
import { InputText } from '@/components/form/input-text';
import { RadioOption } from '@/components/form/radio-option';

import {
  dataOptions,
  medicalDepartment,
  medicalSpecialize,
} from '@/constant/question';

type FormRegisterDoctorProps = {
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  alias: string;
  firstName: string;
  lastName: string;
  gender: string;
  department: string;
  specialize: string;
  //age: string;
};
const Test = () => {
  const registerDoctorSchema: ZodType<FormRegisterDoctorProps> = z
    .object({
      role: z.string(),
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
      alias: z.string().min(2).max(12),
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      gender: z.string(),
      department: z.string(),
      specialize: z.string(),
      //age: z.number().min(16).max(100),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterDoctorProps>({
    mode: 'onChange',
    resolver: zodResolver(registerDoctorSchema),
  });

  const submitData = (data: FormRegisterDoctorProps) => {
    console.log('it worked', data);
  };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <div className='shadow-default-shadow flex h-full w-full max-w-[1100px] flex-col items-center justify-center rounded-xl bg-white p-8 '>
        <FormHeaderText
          icon={FaUserDoctor}
          title='จัดการข้อมูลผู้ใช้ระบบ'
          useBigestHeader
        />

        <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-5'>
          {/* section1 */}
          <div className='col-span-1 space-y-4 rounded-lg border p-2 md:col-span-2'>
            <FormHeaderText title='สร้างบัญชีผู้ใช้' useBigestHeader={false} />

            <RadioOption
              name='role'
              label='บทบาท'
              control={control}
              options={dataOptions.roleOptions}
            />

            <InputText name='email' label='อีเมล' control={control} />

            <InputText name='password' label='รหัสผ่าน' control={control} />
            <InputText
              name='confirmPassword'
              label='ยืนยันรหัสผ่าน'
              control={control}
            />
          </div>

          {/* section2 */}
          <div className='col-span-1 space-y-4 rounded-lg border p-2 md:col-span-3'>
            <FormHeaderText title='ข้อมูลส่วนตัว' useBigestHeader={false} />

            <InputText name='alias' label='คำนำหน้า' control={control} />
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
              name='specialize'
              control={control}
              label='ความเชี่ยวชาญ'
              options={medicalSpecialize}
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
