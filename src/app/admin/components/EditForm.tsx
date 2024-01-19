'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserDoctor } from 'react-icons/fa6';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import FormHeaderText from '@/components/form/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { RadioOption } from '@/components/form/RadioOption';
import {
  FormEditProps,
  FormRegisterDoctorProps,
  editSchema,
  registerDoctorSchema,
} from '@/components/form/validation/form-validation';

import {
  dataOptions,
  medicalDepartment,
  medicalSpecialist,
} from '@/constant/question';
import { MdEdit } from 'react-icons/md';
import { API_PATH } from '@/config/api';
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
  } = useForm<FormEditProps>({
    mode: 'onChange',
    resolver: zodResolver(editSchema),
  });

  const loadUsers = async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get(API_PATH.GET_PROFILE_ALL);
    } catch (error) {
      console.log('error', error);
    }
  };

  // const onSubmit = async (data: FormEditProps) => {
  //   setWaiting(true);
  //   const { prefix, firstName, lastName, gender, department, specialist } =
  //     data;
  //   console.log('Submitted data:', data);

  //   try {
  //     const editProfile = await axiosAuth.put(`${api}`, {
  //       prefix,
  //       firstName,
  //       lastName,
  //       gender,
  //       department,
  //       specialist,
  //     });

  //     console.log('Edit Profile API Response:', editProfile);

  //     enqueueSnackbar('Edit Success', { variant: 'success' });

  //     // Reload the data grid after successful edit
  //     loadUsers();
  //   } catch (error) {
  //     setWaiting(false);
  //     console.log('Error:', error);
  //     enqueueSnackbar('Cannot edit', { variant: 'error' });
  //   }
  // };

  const onSubmit = async (data: FormEditProps) => {
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

              <div className='flex w-full justify-end space-x-3 p-4'>
                <button
                  onClick={closeModal}
                  className='rounded-xl bg-gray-50 px-4 py-4'
                >
                  cancel
                </button>
                <button
                  type='submit'
                  className='flex items-center rounded-xl bg-blue-400 px-4 py-2'
                >
                  submit
                </button>
              </div>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default EditForm;
