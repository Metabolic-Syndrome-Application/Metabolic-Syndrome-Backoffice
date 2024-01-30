'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import FormHeaderText from '@/components/form/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { RadioOption } from '@/components/form/RadioOption';
import {
  createProfileDoctorSchema,
  FormCreateProfileDoctorProps,
} from '@/components/form/validation/form-validation';

import {
  dataOptions,
  medicalDepartment,
  medicalSpecialist,
} from '@/constant/question';
interface IEditMemberFormProps {
  loadData: () => void;
  api: string;
}

const EditForm = ({ loadData, api }: IEditMemberFormProps) => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { enqueueSnackbar } = useSnackbar();

  const { Modal, openModal, closeModal } = useModal();
  const [waiting, setWaiting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormCreateProfileDoctorProps>({
    mode: 'onChange',
    resolver: zodResolver(createProfileDoctorSchema),
  });

  const onSubmit = async (data: FormCreateProfileDoctorProps) => {
    try {
      // Make the API call and handle success
      await axiosAuth.put(`${api}`, {
        prefix: data.prefix,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        department: data.department,
        specialist: data.specialist,
      });

      console.log('Edit successful');

      // Reload the data after successful edit
      enqueueSnackbar('edit success', { variant: 'success' });
      loadData();
      closeModal(); // Close the modal if needed
    } catch (error) {
      console.log('Error:', error);
      enqueueSnackbar('Cannot edit', { variant: 'error' });
    }
  };

  return (
    <div>
      <MdEdit
        className='hover:text-primary group cursor-pointer text-[#999999]'
        onClick={openModal}
      />

      <Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          {waiting ? (
            <>Loading</>
          ) : (
            <div className=''>
              <FormHeaderText
                icon={FaUserDoctor}
                title='แก้ไขข้อมูลในระบบ'
                useBigestHeader
              />

              <div className='flex flex-col gap-4'>
                {/* section2 */}
                <div className='space-y-4 rounded-lg border p-4 '>
                  <FormHeaderText title='ข้อมูลส่วนตัว' />

                  <InputText name='prefix' label='คำนำหน้า' control={control} />
                  <div className='flex space-x-4'>
                    <InputText
                      name='firstName'
                      label='ชื่อจริง'
                      control={control}
                    />
                    <InputText
                      name='lastName'
                      label='นามสกุล'
                      control={control}
                    />
                  </div>
                  <RadioOption
                    name='gender'
                    label='เพศ'
                    control={control}
                    options={dataOptions.genderOptions}
                  />

                  <InputDropdown
                    name='department'
                    control={control}
                    label='แผนก'
                    options={medicalDepartment}
                  />
                  <InputDropdown
                    name='specialist'
                    control={control}
                    label='ความเชี่ยวชาญ'
                    options={medicalSpecialist}
                  />
                </div>
              </div>

              <div className='flex h-full  justify-end space-x-3 p-4'>
                <ActionButton
                  type='reset'
                  variant='cancel'
                  onClick={closeModal}
                >
                  ยกเลิก
                </ActionButton>
                <ActionButton type='submit'>ยืนยัน</ActionButton>
              </div>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default EditForm;
