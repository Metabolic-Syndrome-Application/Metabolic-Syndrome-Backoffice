import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { RadioOption } from '@/components/form/RadioOption';
import {
  FormRegisterDoctorProps,
  registerDoctorSchema,
} from '@/components/form/validation/UserValidator';

import {
  dataOptions,
  medicalDepartment,
  medicalSpecialist,
  yearOptions,
} from '@/constant/user';

//ข้อมูลส่วนตัว
const Information = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterDoctorProps>({
    mode: 'onChange',
    resolver: zodResolver(registerDoctorSchema),
  });

  return (
    <div className='flex w-full flex-col  space-y-4 rounded-lg border p-2'>
      <div className=''>
        <h4>ข้อมูลส่วนตัว</h4>
        <div className='border-light-gray border-[1px]'></div>
      </div>
      <InputText name='HN' label='รหัสคนไข้' control={control} />

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
        name='birthYear'
        control={control}
        label='ปีเกิด (พ.ศ.)'
        options={yearOptions}
      />
      <InputDropdown
        name='department'
        control={control}
        label='แพทย์ผู้รับผิดชอบหลัก'
        options={medicalDepartment}
      />
      <InputDropdown
        name='specialize'
        control={control}
        label='แพทย์ผู้รับผิดชอบรอง'
        options={medicalSpecialist}
      />
    </div>
  );
};

export default Information;
