'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserDoctor } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import ActionButton from '@/components/buttons/ActionButton';
import FormHeaderText from '@/components/form/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import RadioSelectStage from '@/components/form/radio-select-stage';
import { RadioOption } from '@/components/form/RadioOption';
import { ICreatePatientForm, registerPatientSchema } from '@/components/form/validation/PatientValidator';

import { API_PATH } from '@/config/api';
import { dataOptions, yearOptions } from '@/constant/user';
import { fetchAllDoctors, selectAllDoctors } from '@/redux/slices/doctorSlice';



const CreatePatient = () => {

  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch<any>();


  const [hasAccount, setHasAccount] = useState(false);
  const [step, setStep] = useState(1);

  const [selectedValue, setSelectedValue] = useState('noAccount');


  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedValue(event.target.value);
    setHasAccount(event.target.value === 'haveAccount');

    //console.log(event.target.value);
  };

  const handleNextStep = () => {
    setStep(step + 1);
    console.log('next!');
  };
  const doctors = useSelector(selectAllDoctors);

  const getDoctorOptions = () => {
    return doctors.map((doctor) => ({
      label: `${doctor.prefix} ${doctor.firstName} ${doctor.lastName}`,
      value: doctor.id,
    }));
  };
  //แพทย์ประจำตัวหลักและรอง
  // const [options, setOptions] = useState<IGetDoctorOptions[]>([]);
  // const getProfileDoctor = async () => {

  //   try {
  //     const {
  //       data: { data },
  //     } = await axiosAuth.get(API_PATH.GET_PROFILE_ALL_DOCTOR);
  //     console.log('getProfileDoctor :', data.users); // Log API response

  //     setOptions(data.users);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // useEffect(() => {

  //   getProfileDoctor();

  // }, []);
  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<ICreatePatientForm>({
    mode: 'onChange',
    resolver: zodResolver(registerPatientSchema),
  });

  const onSubmit = async (data: any) => {
    console.log('Form Data:', data); // Log form data

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
      // Check if the user is logged in
      if (!userRole) {
        console.log('User is not logged in.');

        return;
      }

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
      const { id: userId } = registerResponse.data.data.user;
      console.log('Register Patient Response:', registerResponse.data.data.user);

      // Only an admin can create a profile
      // API call 2: Create profile
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

      console.log('Create Profile API Response:', createProfileResponse);
      enqueueSnackbar('Register Success', { variant: 'success' });


    } catch (error: any) {
      console.error('Error:', error);
      enqueueSnackbar(error.response?.data, { variant: 'error' });

    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='shadow-default-shadow flex h-full max-w-[1100px] flex-col items-center justify-center rounded-xl bg-white p-8 '>
        <FormHeaderText
          icon={FaUserDoctor}
          title='จัดการข้อมูลคนไข้'
          useBigestHeader
        />
        <div className='flex h-full w-full space-x-4'>
          {/* Apply bg-slate-500 to the entire column */}
          <div className='flex w-2/5'>
            <div className='flex h-full w-full flex-col space-y-4 rounded-lg border p-2'>
              <FormHeaderText title='สร้างบัญชีผู้ใช้' />

              <div className=''>
                <RadioSelectStage
                  groupLabel='บัญชีผู้ใช้'
                  groupName='account'
                  options={dataOptions.accountOptions}
                  onChange={handleRadioButtonChange}
                  name=''
                  control={undefined}
                />
              </div>

              <div className='flex h-full flex-col justify-between '>
                <div>
                  {/* Your form content */}
                  {!hasAccount && selectedValue === 'noAccount' && (
                    <div className='space-y-4'>
                      <h2>Step 1: Register New Patient</h2>
                      <RadioOption
                        name='role'
                        label='role'
                        control={control}
                        options={dataOptions.patientOption}
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
                      />
                      <InputText
                        name='passwordConfirm'
                        label='ยืนยันรหัสผ่าน'
                        control={control}
                      />

                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ข้อมูลส่วนตัว column */}
          <div className='w-3/5'>
            <div className='flex w-full flex-col  space-y-4 rounded-lg border p-2'>
              <div className=''>
                <h4>ข้อมูลส่วนตัว</h4>
                <div className='border-light-gray border-[1px]'></div>
              </div>
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
                name='yearOfBirth'  // Update to match the schema
                control={control}
                label='ปีเกิด (พ.ศ.)'
                options={yearOptions}
              />

              <InputDropdown
                name='mainDoctorID'
                control={control}
                label='แพทย์ผู้รับผิดชอบหลัก'
                options={getDoctorOptions()}

              />

              <InputDropdown
                name='assistanceDoctorID'
                control={control}
                label='แพทย์ผู้รับผิดชอบรอง'
                options={getDoctorOptions()}
              />
              <InputText name='disease' label='โรค' control={control} />
            </div>
          </div>
        </div>

        {/* Button section */}
        <div className='flex w-full justify-end p-4'>
          {hasAccount ? (
            <button
              onClick={handleNextStep}
              className='rounded-lg bg-default-blue px-4 py-2 text-white'
            >
              ถัดไป
            </button>

          ) : (
            <ActionButton type='submit' variant='submit'>
              สมัครบัญชี
            </ActionButton>
          )}
        </div>


      </div>
    </form >
  );
};

export default CreatePatient;
