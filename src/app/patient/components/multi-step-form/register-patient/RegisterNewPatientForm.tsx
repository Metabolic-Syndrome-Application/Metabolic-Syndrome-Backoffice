/* eslint-disable unused-imports/no-unused-vars */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useDoctorOptions } from '@/lib/dataOptions';
import useAxiosAuth from '@/hooks/useAxiosAuth';

import ActionButton from '@/components/buttons/ActionButton';
import FormHeaderText from '@/components/form/components/FormHeaderText';
import { IDCardInputText } from '@/components/form/IDCardInputText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { RadioOption } from '@/components/form/RadioOption';
import { registerNewPatientSchema } from '@/components/form/validation/PatientValidator';

import { API_PATH } from '@/config/api';
import { dataOptions, yearOptions } from '@/constant/user';
import { fetchAllPatients } from '@/redux/slices/patientsSlice';

import { useFormState } from '../form-context/FormContext';

type TFormValues = {
  role: string;
  username: string;
  password: string;
  passwordConfirm: string;
  hn: string;
  firstName: string;
  lastName: string;
  gender: string;
  yearOfBirth: number;
  mainDoctorID: string;
  assistanceDoctorID: string;
  disease: string;
};

//Register a new patient
export function RegisterNewPatientForm() {
  const axiosAuth = useAxiosAuth();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch<any>();
  const getDoctorOptions = useDoctorOptions();

  const { formData } = useFormState();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TFormValues>({
    defaultValues: formData,
    mode: 'onChange',
    resolver: zodResolver(registerNewPatientSchema),
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = async (data: TFormValues) => {
    if (formSubmitted) return;

    setFormSubmitted(true);

    try {
      const hnCheckResponse = await axiosAuth.post(API_PATH.POST_CHECK_HN, {
        hn: data.hn,
      });

      // Check HN : if hn already exists on the server?
      if (hnCheckResponse.data.status === 'success') {
        enqueueSnackbar('This HN can be used.', { variant: 'success' });

        const registerResponse = await axiosAuth.post(
          API_PATH.POST_REGISTER_OTHER,
          {
            role: data.role,
            username: data.username,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
          }
        );

        const { id: userId } = registerResponse.data.data.user;

        const createProfileResponse = await axiosAuth.put(
          API_PATH.PUT_PROFILE_PATIENT_OTHER(userId),
          {
            hn: data.hn,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            yearOfBirth: data.yearOfBirth,
            mainDoctorID: data.mainDoctorID,
            assistanceDoctorID: data.assistanceDoctorID,
            disease: data.disease,
          }
        );

        enqueueSnackbar('New patient account created.', { variant: 'success' });
        await dispatch(fetchAllPatients());
      } else {
        enqueueSnackbar(hnCheckResponse.data.message, { variant: 'error' });
      }
    } catch (error: any) {
      console.error('Error:', error);
      enqueueSnackbar(
        error.response?.data.message || 'Failed to submit form.',
        { variant: 'error' }
      );
    } finally {
      //formSubmitted state ensures that the form can be submitted again
      setFormSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid w-full grid-cols-3 gap-4 md:flex-row'>
        {/* Section1 */}
        <div className='col-span-3 h-full w-full flex-col space-y-4 rounded-lg border p-4 md:col-span-1'>
          <FormHeaderText title='สร้างบัญชีผู้ใช้' />
          <RadioOption
            name='role'
            label='บทบาท'
            control={control}
            options={dataOptions.patientOption}
            defaultValue={dataOptions.patientOption[0].value}
          />

          <IDCardInputText
            name='username'
            control={control}
            label='เลขประตัวประชาชน'
          />

          <InputText
            name='password'
            label='รหัสผ่าน'
            control={control}
            showPasswordToggle
            type='password'
          />
          <InputText
            name='passwordConfirm'
            label='ยืนยันรหัสผ่าน'
            control={control}
            showPasswordToggle
            type='password'
          />
        </div>

        {/* Section2 */}
        <div className='col-span-3 h-full w-full flex-col space-y-4 rounded-lg border p-4 md:col-span-2 '>
          <FormHeaderText title='ข้อมูลส่วนตัว' />
          <InputText name='hn' label='รหัสคนไข้' control={control} />
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
            name='yearOfBirth'
            control={control}
            label='ปีเกิด (พ.ศ.)'
            options={yearOptions}
          />
          <InputDropdown
            name='mainDoctorID'
            control={control}
            label='แพทย์ผู้รับผิดชอบหลัก'
            options={getDoctorOptions}
          />
          <InputDropdown
            name='assistanceDoctorID'
            control={control}
            label='แพทย์ผู้รับผิดชอบรอง'
            options={getDoctorOptions}
          />
          <InputText name='disease' label='โรคที่พบ' control={control} />
        </div>
      </div>
      <div className='mt-4 flex justify-end gap-4'>
        <ActionButton
          type='submit'
          variant='submit'
          disabled={!isDirty || Object.keys(errors).length > 0}
        >
          ยืนยันการสมัครบัญชีคนไข้
        </ActionButton>
      </div>
    </form>
  );
}
