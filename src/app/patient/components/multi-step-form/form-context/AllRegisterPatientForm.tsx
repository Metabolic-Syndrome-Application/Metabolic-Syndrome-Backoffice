'use client';

import { useState } from 'react';
import { FaHospitalUser } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { FaHospital } from 'react-icons/fa6';

import FormHeaderText from '@/components/form/components/FormHeaderText';

import { ConnectPatientForm } from '@/app/patient/components/multi-step-form/connect-patient/ConnectPatientForm';
import { GenerateOTPForm } from '@/app/patient/components/multi-step-form/connect-patient/GenerateOTPForm';
import { useFormState } from '@/app/patient/components/multi-step-form/form-context/FormContext';
import { RegisterNewPatientForm } from '@/app/patient/components/multi-step-form/register-patient/RegisterNewPatientForm';
export enum AccountOption {
  noAccount = 'noAccount',
  haveAccount = 'haveAccount',
}

export default function AllRegisterPatientForm() {
  const { step, setFormData } = useFormState();
  const [selectedOption, setSelectedOption] = useState<AccountOption>(
    AccountOption.noAccount
  );

  const handleOptionChange = (option: AccountOption) => {
    setSelectedOption(option);
    // Set form data when option changes
    setFormData({});
  };

  const renderForm = () => {
    switch (selectedOption) {
      case AccountOption.noAccount:
        return <RegisterNewPatientForm />;
      case AccountOption.haveAccount:
        if (step === 1) {
          return <ConnectPatientForm selectedOption={selectedOption} />;
        } else if (step === 2) {
          return <GenerateOTPForm />;
        }
        break;
      default:
        return null;
    }
  };

  return (
    <div className='w-full'>
      <FormHeaderText icon={FaUser} title='จัดการข้อมูลคนไข้' useBigestHeader />
      <div className='flex w-full flex-col space-y-2 rounded-lg'>
        <h4 className='px-2'>เลือกรูปแบบ</h4>
        <div className='grid w-full grid-flow-col justify-stretch space-x-4 pb-4 lg:w-2/5'>
          {/* ยังไม่เคยมีบัญชี */}
          <div className='flex items-center'>
            <label className='inline-flex w-full'>
              <input
                type='radio'
                className='peer hidden'
                value={AccountOption.noAccount}
                checked={selectedOption === AccountOption.noAccount}
                onChange={() => handleOptionChange(AccountOption.noAccount)}
              />
              <div className='border-light-gray text-default-gray peer-checked:bg-light-blue peer-checked:text-default-blue peer-checked:border-light-blue flex w-full items-center justify-center gap-3 rounded-lg border px-3 py-2 peer-checked:border'>
                <FaHospital className='h-6 w-6 md:h-9 md:w-9' />
                <p className='whitespace-nowrap'>ยังไม่เคยมีบัญชี</p>
              </div>
            </label>
          </div>

          {/* มีบัญชีแล้ว */}
          <div className='flex items-center'>
            <label className='inline-flex w-full'>
              <input
                type='radio'
                className='peer hidden'
                value={AccountOption.haveAccount}
                checked={selectedOption === AccountOption.haveAccount}
                onChange={() => handleOptionChange(AccountOption.haveAccount)}
              />
              <div className='border-light-gray text-default-gray peer-checked:bg-light-blue peer-checked:text-default-blue peer-checked:border-light-blue flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 peer-checked:border'>
                <FaHospitalUser className='h-6 w-6 md:h-9 md:w-9' />
                <p className='whitespace-nowrap'>มีบัญชีแล้ว</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className='flex h-full w-full space-x-4'>{renderForm()}</div>
    </div>
  );
}
