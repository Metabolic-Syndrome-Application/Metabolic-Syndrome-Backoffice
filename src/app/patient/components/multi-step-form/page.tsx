'use client';
import React from 'react';

import useModal from '@/hooks/useModal';

import { IconFlatButton } from '@/components/buttons/IconFlatButton';
import HeaderArticle from '@/components/common/HeaderArticle';

import AllRegisterPatientForm from '@/app/patient/components/multi-step-form/form-context/AllRegisterPatientForm';
import { FormProvider } from '@/app/patient/components/multi-step-form/form-context/FormContext';

const MultiFormPatient = () => {
  const { Modal, openModal } = useModal();

  return (
    <div className='w-full'>
      <HeaderArticle title='ข้อมูลคนไข้' variant='h1'>
        <IconFlatButton title='เพิ่มข้อมูลคนไข้' onClick={openModal} />
      </HeaderArticle>

      <Modal>
        <div className='container mx-auto'>
          <FormProvider>
            <AllRegisterPatientForm />
          </FormProvider>
        </div>
      </Modal>
    </div>
  );
};

export default MultiFormPatient;
