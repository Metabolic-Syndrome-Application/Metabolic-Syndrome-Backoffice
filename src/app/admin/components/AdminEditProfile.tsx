'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

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
} from '@/components/form/validation/UserValidator';

import {
  dataOptions,
  medicalDepartment,
  medicalSpecialist,
} from '@/constant/user';
import { fetchUser } from '@/redux/slices/profileSlice';
import { selectAllUsers } from '@/redux/slices/usersSlice';

interface IEditMemberFormProps {
  loadData: () => void;
  id: string;
  api: string;
}

const AdminEditProfile = ({ loadData, api, id }: IEditMemberFormProps) => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { enqueueSnackbar } = useSnackbar();

  const { Modal, openModal, closeModal } = useModal();
  const [waiting, setWaiting] = useState(false);

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch<any>();

  //filter id ใน users เเล้วดูว่า id ตรงกันมั้ย ตอนนี้เแน array => [0]
  // const user = users.filter((u) => u.id === id)[0];
  const currentUser = users.find((user) => user.id === id);

  // console.log('currentUser index', currentUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCreateProfileDoctorProps>({
    mode: 'onChange',
    resolver: zodResolver(createProfileDoctorSchema),
    defaultValues: {
      prefix: currentUser?.prefix || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      gender: currentUser?.gender || '',
      department: currentUser?.department || '',
      specialist: currentUser?.specialist || '',
    },
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

      // Reload the data after successful edit
      enqueueSnackbar('edit success', { variant: 'success' });
      loadData();
      await dispatch(fetchUser());

      closeModal(); // Close the modal if needed
    } catch (error) {
      enqueueSnackbar('Cannot edit', { variant: 'error' });
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <MdEdit
        className='hover:text-default-blue focus:text-default-blue group cursor-pointer text-[#999999]'
        onClick={openModal}
      />

      <Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          {waiting ? (
            <>Loading</>
          ) : (
            <div>
              <FormHeaderText
                icon={FaUserDoctor}
                title='แก้ไขข้อมูลในระบบ'
                useBigestHeader
              />

              <div className='flex flex-col gap-4'>
                <div className='space-y-5 rounded-lg border p-4'>
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

              <div className='flex h-full justify-end space-x-3 p-4'>
                <ActionButton
                  type='reset'
                  variant='cancel'
                  onClick={closeModal}
                >
                  ยกเลิก
                </ActionButton>
                <ActionButton type='submit' variant='submit'>
                  แก้ไขโปรไฟล์
                </ActionButton>
              </div>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default AdminEditProfile;
