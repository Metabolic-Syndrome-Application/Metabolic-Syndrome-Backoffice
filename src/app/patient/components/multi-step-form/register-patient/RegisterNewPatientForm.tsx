/* eslint-disable unused-imports/no-unused-vars */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useDoctorOptions } from '@/lib/dataOptions';
import useAxiosAuth from '@/hooks/useAxiosAuth';

import ActionButton from '@/components/buttons/ActionButton';
import FormHeaderText from '@/components/form/FormHeaderText';
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
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<any>();
  const { formData } = useFormState();
  const { control, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
    mode: 'onChange',
    resolver: zodResolver(registerNewPatientSchema),
  });

  const getDoctorOptions = useDoctorOptions();

  // const onHandleFormSubmit = async (data: TFormValues) => {
  //   const {
  //     role,
  //     username,
  //     password,
  //     passwordConfirm,
  //     hn,
  //     firstName,
  //     lastName,
  //     yearOfBirth,
  //     gender,
  //     mainDoctorID,
  //     assistanceDoctorID,
  //     disease,
  //   } = data;

  //   try {
  //     const registerResponse = await axiosAuth.post(
  //       API_PATH.POST_REGISTER_OTHER,
  //       { role, username, password, passwordConfirm }
  //     );
  //     const { id: userId } = registerResponse.data.data.user;

  //     // Check if registerResponse is successful
  //     if (registerResponse.status === 200) {
  //       const createProfileResponse = await axiosAuth.put(
  //         API_PATH.PUT_PROFILE_PATIENT_OTHER(userId),
  //         {
  //           hn,
  //           firstName,
  //           lastName,
  //           gender,
  //           yearOfBirth,
  //           mainDoctorID,
  //           assistanceDoctorID,
  //           disease,
  //         }
  //       );
  //       enqueueSnackbar('Create a new account for the patient', {
  //         variant: 'success',
  //       });
  //       await dispatch(fetchAllPatients());
  //     } else {
  //       // Handle unsuccessful registration
  //       enqueueSnackbar('Create a new account for the patient', {
  //         variant: 'error',
  //       });
  //     }
  //   } catch (error: any) {
  //     enqueueSnackbar(error.response?.data, { variant: 'error' });
  //   }
  // };

  const onHandleFormSubmit = async (data: TFormValues) => {
    const {
      role,
      username,
      password,
      passwordConfirm,
      hn,
      firstName,
      lastName,
      yearOfBirth,
      gender,
      mainDoctorID,
      assistanceDoctorID,
      disease,
    } = data;
    const userRole = session?.user?.role;

    try {
      if (!userRole) {
        console.log('User is not logged in.');
        return;
      }

      const registerResponse = await axiosAuth.post(
        API_PATH.POST_REGISTER_OTHER,
        { role, username, password, passwordConfirm }
      );
      const { id: userId } = registerResponse.data.data.user;

      const createProfileResponse = await axiosAuth.put(
        API_PATH.PUT_PROFILE_PATIENT_OTHER(userId),
        {
          hn,
          firstName,
          lastName,
          gender,
          yearOfBirth,
          mainDoctorID,
          assistanceDoctorID,
          disease,
        }
      );
      enqueueSnackbar('Register Success', { variant: 'success' });
      await dispatch(fetchAllPatients());
    } catch (error: any) {
      console.error('Error:', error);
      enqueueSnackbar(error.response?.data, { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onHandleFormSubmit)}>
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

          <InputText
            name='username'
            label='เลขประตัวประชาชน'
            control={control}
          />
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
        <ActionButton type='submit' variant='submit'>
          ยืนยันการสมัครบัญชีคนไข้
        </ActionButton>
      </div>
    </form>
  );
}
