/* eslint-disable unused-imports/no-unused-vars */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserDoctor } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import { useDoctorOptions, useStatusOptions } from '@/lib/dataOptions';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import HeaderArticle from '@/components/common/HeaderArticle';
import FormHeaderText from '@/components/form/components/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { RadioOption } from '@/components/form/RadioOption';
import {
  staffEditPatientSchema,
  staffEditPatientSchemaValues,
} from '@/components/form/validation/PatientValidator';

import { API_PATH } from '@/config/api';
import { dataOptions, yearOptions } from '@/constant/user';
import {
  fetchPatientById,
  selectPatientById,
} from '@/redux/slices/patientsSlice';

const StaffEditPatientForm = ({
  params,
  loadData,
}: {
  params: { id: string };
  loadData: () => void;
}) => {
  //params id
  const id = params.id;
  const axiosAuth = useAxiosAuth();

  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<any>();

  const patient = useSelector(selectPatientById);
  const [submittedData, setSubmittedData] =
    useState<staffEditPatientSchemaValues | null>(null);

  console.log('edit plan', patient);

  const { control, handleSubmit, reset } =
    useForm<staffEditPatientSchemaValues>({
      mode: 'onChange',
      resolver: zodResolver(staffEditPatientSchema),
      defaultValues: submittedData || {},
    });

  const getDoctorOptions = useDoctorOptions();
  const getStatusOptions = useStatusOptions();

  useEffect(() => {
    if (patient) {
      reset(patient);
    }
  }, [patient, reset]);

  const onSubmit = async (data: z.infer<typeof staffEditPatientSchema>) => {
    try {
      // Make the API call and handle success

      const response = await axiosAuth.put(
        API_PATH.PUT_PROFILE_PATIENT_OTHER(id),
        {
          hn: data.hn,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          yearOfBirth: data.yearOfBirth,
          mainDoctorID: data.mainDoctorID,
          assistanceDoctorID: data.assistanceDoctorID,
          disease: data.disease,
          status: data.status,
        }
      );

      // Reload the data after successful edit
      enqueueSnackbar('Edit Success', { variant: 'success' });
      loadData();
      await dispatch(fetchPatientById(id));

      closeModal(); // Close the modal if needed
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      console.log('Error:', error);
    }
  };

  return (
    <div className='w-full'>
      <HeaderArticle
        title='ข้อมูลส่วนตัว'
        variant='h4'
        className='mb-3 bg-gray-50 px-6 py-4'
      >
        <div className='flex items-center gap-1' onClick={openModal}>
          <FiEdit className='hover:bg-light-gray text-default-blue group h-5 w-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out' />
          <p className='text-default-blue'>แก้ไข</p>
        </div>
      </HeaderArticle>

      <Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormHeaderText
            icon={FaUserDoctor}
            title='แก้ไขข้อมูลคนไข้'
            useBigestHeader
          />
          <div className='grid w-full grid-cols-1'>
            {/* Section1 */}
            <div className='col-span-1 w-full space-y-6 rounded-lg border p-4 lg:w-[800px]'>
              <FormHeaderText title='ข้อมูลส่วนตัว' />
              <InputText name='hn' label='รหัสคนไข้' control={control} />
              <div className='flex space-x-4'>
                <InputText
                  name='firstName'
                  label='ชื่อจริง'
                  control={control}
                />
                <InputText name='lastName' label='นามสกุล' control={control} />
              </div>
              <RadioOption
                name='gender'
                label='เพศ'
                control={control}
                options={dataOptions.genderOptions}
              />
              <InputDropdown
                name='yearOfBirth'
                control={control}
                label='ปีเกิด (พ.ศ.)'
                options={yearOptions}
              />
              <InputDropdown
                name='status'
                control={control}
                label='สถานะการรักษา'
                options={getStatusOptions}
              />
              <FormHeaderText title='แพทย์ผู้รับผิดชอบ' />
              <InputDropdown
                name='mainDoctorID'
                control={control}
                label='แพทย์ผู้รับผิดชอบหลัก'
                options={getDoctorOptions}
              />
              <InputDropdown
                name='assistanceDoctorID'
                control={control}
                label='แพทย์ผู้รับผิดชอบรอง'
                options={getDoctorOptions}
              />
            </div>
          </div>

          <div className='mb-20 flex w-full justify-end space-x-3 py-4 md:mb-4'>
            <ActionButton type='submit' variant='submit'>
              แก้ไข
            </ActionButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default StaffEditPatientForm;
