'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserDoctor } from 'react-icons/fa6';

import FormHeaderText from '@/components/form/form-header-text';
import Information from '@/components/form/information';
import { InputText } from '@/components/form/input-text';
import RadioSelectStage from '@/components/form/radio-select-stage';

import { dataOptions } from '@/constant/question';

const TestCreatePatient = () => {
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Form submitted!');
  };

  const options = [
    { label: 'Have account', value: 'yes' },
    { label: "Don't have account", value: 'no' },
  ];

  const { control } = useForm();

  return (
    <form onSubmit={handleSubmit}>
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
              <FormHeaderText
                title='สร้างบัญชีผู้ใช้'
                useBigestHeader={false}
              />

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

              <div className='flex h-full flex-col justify-between'>
                <div>
                  {/* Your form content */}
                  {!hasAccount && selectedValue === 'noAccount' ? (
                    <div className=''>
                      <h2>Step 1: Register New Patient</h2>

                      <InputText
                        name='IDCard'
                        label='เลขประตัวประชาชน'
                        control={control}
                      />
                      <InputText
                        name='password'
                        label='รหัสผ่าน'
                        control={control}
                      />
                      <InputText
                        name='confirmPassword'
                        label='ยืนยันรหัสผ่าน'
                        control={control}
                      />

                      {/* <InputDropdown
                        name='myDropdown'
                        control={control}
                        label='Choose an option'
                        options={[
                          { value: 'O1', label: 'Option 1' },
                          { value: 'O2', label: 'Option 2' },
                          // Add more options as needed
                        ]}
                      /> */}
                    </div>
                  ) : (
                    <div className='bg-blue-50'>
                      <h2>Step 2 : have an account</h2>
                      {/* Account verification fields */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Other column */}
          <div className='w-3/5'>
            <Information />
          </div>
        </div>

        {/* Button section */}
        <div className='flex w-full justify-end p-4'>
          {hasAccount ? (
            <button
              onClick={handleNextStep}
              className='rounded-lg bg-blue-500 px-4 py-2'
            >
              Next
            </button>
          ) : (
            <button className='rounded-lg bg-blue-500 px-4 py-2'>
              Register
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TestCreatePatient;
