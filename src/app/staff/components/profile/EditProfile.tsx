/* eslint-disable unused-imports/no-unused-vars */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import FormHeaderText from '@/components/form/components/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { RadioOption } from '@/components/form/RadioOption';
import {
  createProfileDoctorSchema,
  FormCreateProfileDoctorProps,
} from '@/components/form/validation/UserValidator';

import {
  dataOptions,
  medicalDepartment,
  medicalSpecialist,
} from '@/constant/user';
import { fetchUser, selectUser, updateUser } from '@/redux/slices/profileSlice';

const EditProfile = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { Modal, openModal, closeModal } = useModal();

  const user = useSelector(selectUser);
  const dispatch = useDispatch<any>();

  const { control, handleSubmit } = useForm<FormCreateProfileDoctorProps>({
    mode: 'onChange',
    resolver: zodResolver(createProfileDoctorSchema),
    defaultValues: {
      prefix: user.prefix,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      department: user.department,
      specialist: user.specialist,
    },
  });

  const onSubmit = async (data: FormCreateProfileDoctorProps) => {
    try {
      // Dispatch the updateUser action
      await dispatch(updateUser(data));
      //console.log('Edit Profile successful', data);

      enqueueSnackbar('Edit Profile Success', { variant: 'success' });
      // Load the updated user
      await dispatch(fetchUser());
      closeModal();
    } catch (error) {
      enqueueSnackbar('Cannot edit', { variant: 'error' });
      console.log('Error:', error);
    }
  };
  return (
    <div>
      <FiEdit
        className='hover:bg-light-gray text-default-blue group h-5 w-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out'
        onClick={openModal}
      />
      <Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full'>
            <FormHeaderText
              icon={MdEdit}
              title='แก้ไขข้อมูลส่วนตัว'
              useBigestHeader
            />

            <div className='flex flex-col gap-4'>
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

            <div className='flex w-full justify-end space-x-3 py-4'>
              <ActionButton type='reset' variant='cancel' onClick={closeModal}>
                ยกเลิก
              </ActionButton>
              <ActionButton type='submit' variant='submit'>
                แก้ไขโปรไฟล์
              </ActionButton>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditProfile;
