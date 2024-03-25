'use client';
import React from 'react';

import useModal from '@/hooks/useModal';

import { IconFlatButton } from '@/components/buttons/IconFlatButton';

import AllRegisterPatientForm from '@/app/patient/components/multi-step-form/form-context/AllRegisterPatientForm';
import { FormProvider } from '@/app/patient/components/multi-step-form/form-context/FormContext';

const MultiFormPatient = () => {
  const { Modal, openModal } = useModal();

  return (
    <div className='w-full'>
      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h1 className='text-balance'>ข้อมูลคนไข้</h1>
        <IconFlatButton title='เพิ่มข้อมูลคนไข้' onClick={openModal} />
      </article>
      <Modal>
        <div className='container mx-auto w-full md:w-screen lg:w-[900px]'>
          <FormProvider>
            <AllRegisterPatientForm />
          </FormProvider>
        </div>
      </Modal>
    </div>
  );
};

export default MultiFormPatient;
