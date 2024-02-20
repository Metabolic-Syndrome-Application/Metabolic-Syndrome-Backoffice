'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import useModal from '@/hooks/useModal';

import FormHeaderText from '@/components/form/FormHeaderText';
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
interface IEditMemberFormProps {
  loadData?: () => void;
  api?: string;
}

const EditProfile = ({ loadData, api }: IEditMemberFormProps) => {

  const { enqueueSnackbar } = useSnackbar();

  const { Modal, openModal, closeModal } = useModal();
  const [waiting, setWaiting] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<any>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormCreateProfileDoctorProps>({
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

      console.log('Edit successful', data);

      // Reload the data after a successful edit
      enqueueSnackbar('edit success', { variant: 'success' });
      // Load the updated user data immediately
      await dispatch(fetchUser());
      closeModal(); // Close the modal if needed
    } catch (error) {
      console.log('Error:', error);

      enqueueSnackbar('Cannot edit', { variant: 'error' });
    }
  };

  //old function
  // const onSubmit = async (data: FormCreateProfileDoctorProps) => {
  //   try {
  //     // Make the API call and dispatch the updateUser action
  //     const response = await axiosAuth.put(`${api}`, {
  //       prefix: data.prefix,
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       gender: data.gender,
  //       department: data.department,
  //       specialist: data.specialist,
  //     });

  //     dispatch(updateUser(response.data));
  //     dispatch(
  //       updateUser({
  //         prefix: data.prefix,
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         gender: data.gender,
  //         department: data.department,
  //         specialist: data.specialist,
  //       })
  //     );
  //     console.log('Edit successful', response.data);

  //     // Reload the data after a successful edit
  //     enqueueSnackbar('edit success', { variant: 'success' });
  //     //loadData();
  //     dispatch(fetchUser());
  //     closeModal(); // Close the modal if needed
  //   } catch (error) {
  //     console.log('Error:', error);
  //     enqueueSnackbar('Cannot edit', { variant: 'error' });
  //   }
  // };
  console.log('user edit', user);

  return (
    <div>
      <FiEdit
        className='hover:bg-light-gray text-default-blue group h-5 w-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out'
        onClick={openModal}
      />
      <Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          {waiting ? (
            <>Loading</>
          ) : (
            <div className=''>
              <FormHeaderText
                icon={MdEdit}
                title='แก้ไขข้อมูลส่วนตัว'
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

export default EditProfile;
