"use client"


import { useState } from "react";
import { FaHospitalUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa6";

import FormHeaderText from "@/components/form/FormHeaderText";

import { GenerateOTPForm } from "@/app/patient/components/multi-step-form/connect-patient/GenerateOTPForm";
import { InformationFieldForm } from "@/app/patient/components/multi-step-form/connect-patient/InformationFieldForm";
import { useFormState } from "@/app/patient/components/multi-step-form/form-context/FormContext";
import { RegisterNewPatientForm } from "@/app/patient/components/multi-step-form/register-patient/RegisterNewPatientForm";
export enum AccountOption {
  noAccount = "noAccount",
  haveAccount = "haveAccount",
}

export default function AllRegisterPatientForm() {
  const { step, setFormData } = useFormState();
  const [selectedOption, setSelectedOption] = useState<AccountOption>(AccountOption.noAccount);

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
          return <InformationFieldForm selectedOption={selectedOption} />;
        } else if (step === 2) {
          return <GenerateOTPForm />;
        }
        break;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <FormHeaderText icon={FaUser} title="จัดการข้อมูลคนไข้" useBigestHeader />
      <div className="flex flex-col rounded-lg space-y-2">
        <h4 className="px-2">เลือกรูปแบบ</h4>
        <div className="flex w-full lg:w-2/5 h-full justify-center items-center space-x-4 pr-1 pb-4">
          <label className="w-full flex items-center justify-center">
            <input
              type="radio"
              className="hidden peer"
              value={AccountOption.noAccount}
              checked={selectedOption === AccountOption.noAccount}
              onChange={() => handleOptionChange(AccountOption.noAccount)}
            />
            <div className="flex gap-2 px-3 py-2 w-full items-center justify-around rounded-lg border border-light-gray text-default-gray peer-checked:bg-light-blue peer-checked:text-default-blue peer-checked:border peer-checked:border-light-blue">
              <p className="whitespace-nowrap">ยังไม่เคยมีบัญชี</p>
              <FaHospital className="w-10 h-10" />
            </div>
          </label>

          <label className="w-full flex items-center justify-center">
            <input
              type="radio"
              className="hidden peer"
              value={AccountOption.haveAccount}
              checked={selectedOption === AccountOption.haveAccount}
              onChange={() => handleOptionChange(AccountOption.haveAccount)}
            />
            <div className="flex gap-2 px-3 py-2 w-full items-center justify-around rounded-lg border border-light-gray text-default-gray peer-checked:bg-light-blue peer-checked:text-default-blue peer-checked:border peer-checked:border-light-blue">
              <p className="whitespace-nowrap">มีบัญชีแล้ว</p>
              <FaHospitalUser className="w-10 h-10" />
            </div>
          </label>
        </div>


      </div>


      <div className="flex h-full w-full space-x-4">
        {renderForm()}
      </div>
    </div>
  );
}
