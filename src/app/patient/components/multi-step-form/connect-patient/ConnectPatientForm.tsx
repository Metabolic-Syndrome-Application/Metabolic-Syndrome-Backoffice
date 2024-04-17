'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useDoctorOptions } from '@/lib/dataOptions';
import useAxiosAuth from '@/hooks/useAxiosAuth';

import ActionButton from '@/components/buttons/ActionButton';
import FormHeaderText from '@/components/form/components/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { RadioOption } from '@/components/form/RadioOption';
import { registerCurrentPatientchema } from '@/components/form/validation/PatientValidator';

import { AccountOption } from '@/app/patient/components/multi-step-form/form-context/AllRegisterPatientForm';
import { API_PATH } from '@/config/api';
import { dataOptions, yearOptions } from '@/constant/user';
import { fetchAllDoctors } from '@/redux/slices/doctorSlice';

import { useFormState } from '../form-context/FormContext';

type TFormValues = {
  hn: string;
  gender: string;
  yearOfBirth: number;
  mainDoctorID: string;
  assistanceDoctorID: string;
  disease: string;
};

interface Props {
  selectedOption: string;
}

export function ConnectPatientForm({ selectedOption }: Props) {
  const axiosAuth = useAxiosAuth();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch<any>();

  //get doctor options
  const getDoctorOptions = useDoctorOptions();

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  const { onHandleNext, setFormData, formData } = useFormState();
  const { control, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
    mode: 'onChange',
    resolver: zodResolver(registerCurrentPatientchema),
  });

  const onHandleFormSubmit = async (data: TFormValues) => {
    try {
      const response = await axiosAuth.post(API_PATH.POST_GEN_OTP, data);
      const { id, otp } = response.data.data; // Extract id and otp from the response

      // Set the OTP & id in the form data
      setFormData((prev: any) => ({ ...prev, id, otp }));

      // Go to the next step
      onHandleNext();

      //console.log('gen otp:', response.data);
      enqueueSnackbar('Create OTP Success', { variant: 'success' });
    } catch (error: any) {
      //console.error('Error generating OTP:', error);
      enqueueSnackbar(error.response?.data, { variant: 'error' });
    }
  };

  return (
    <div className='w-full md:w-[900px] '>
      <form onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className='grid w-full grid-cols-1 space-y-4 rounded-lg border p-4'>
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
        <div className='mb-20 mt-4 flex justify-end gap-4 md:mb-4'>
          {selectedOption === AccountOption.haveAccount && (
            <ActionButton type='submit' variant='submit'>
              ยืนยันการเชื่อมต่อข้อมูลคนไข้
            </ActionButton>
          )}
        </div>
      </form>
    </div>
  );
}
