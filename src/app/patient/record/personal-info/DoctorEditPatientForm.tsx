/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-vars */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserDoctor } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { z } from 'zod';

import {
  useDoctorOptions,
  useMappedPlanID,
  usePlanOptions,
  useStatusOptions,
} from '@/lib/dataOptions';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import HeaderArticle from '@/components/common/HeaderArticle';
import FormHeaderText from '@/components/form/components/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import { MultiselectCheckboxTags } from '@/components/form/MultiselectCheckboxTags';
import { RadioOption } from '@/components/form/RadioOption';
import {
  doctorEditPatientSchema,
  doctorEditPatientSchemaValues,
} from '@/components/form/validation/PatientValidator';

import { API_PATH } from '@/config/api';
import { dataOptions, yearOptions } from '@/constant/user';
import { selectPatientById } from '@/redux/slices/patientsSlice';

const DoctorEditPatientForm = ({
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

  // const dispatch = useDispatch<any>();
  const patient = useSelector(selectPatientById);

  const [submittedData, setSubmittedData] =
    useState<doctorEditPatientSchemaValues | null>(null);

  //console.log('doctor edit plan', patient);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<doctorEditPatientSchemaValues>({
    mode: 'onChange',
    resolver: zodResolver(doctorEditPatientSchema),
    defaultValues: submittedData || {},
  });

  //fix: Maximum update depth exceeded?
  // Get planID array from patient data
  const getDoctorOptions = useDoctorOptions();
  const getStatusOptions = useStatusOptions();
  const planID = patient?.planID || [];
  const getPlanOptions = usePlanOptions(planID);
  const mappedPlanID = useMappedPlanID(patient, getPlanOptions);

  useEffect(() => {
    if (patient) {
      // Map planID to corresponding options with labels and values
      reset({ ...patient, planID: mappedPlanID });
    }
  }, [patient, reset]);

  const onSubmit = async (data: z.infer<typeof doctorEditPatientSchema>) => {
    try {
      // eslint-disable-next-line unused-imports/no-unused-vars
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
          planID: data.planID ? data.planID.map((plan: any) => plan.value) : [],
          status: data.status,
        }
      );

      // Reload the data after successful edit
      enqueueSnackbar('edit success', { variant: 'success' });
      loadData();
      // await dispatch(fetchPatientById(id));

      closeModal(); // Close the modal if needed
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      console.log('Error:', error);
    }
  };

  return (
    <div className='w-full'>
      <HeaderArticle
        title='ข้อมูลส่วนตัวและแผนปรับพฤติกรรม'
        variant='h4'
        className='mb-3 bg-gray-50 px-6 py-4'
      >
        <div className='flex items-center gap-1' onClick={openModal}>
          <FiEdit className='hover:bg-light-gray text-default-blue group h-5 w-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out' />
          <p className='text-default-blue'>แก้ไข</p>
        </div>
      </HeaderArticle>

      <Modal>
        <form
          className='flex w-full flex-col'
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormHeaderText
            icon={FaUserDoctor}
            title='แก้ไขข้อมูลคนไข้'
            useBigestHeader
          />
          <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-5'>
            {/* Section1 */}
            <div className='col-span-1 space-y-6 rounded-lg border p-4 md:col-span-2'>
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

            {/* Section2 */}
            <div className='col-span-1 space-y-6 rounded-lg border p-4 md:col-span-3'>
              <FormHeaderText title='โปรแกรมสุขภาพ' />
              <InputText name='disease' label='โรคที่พบ' control={control} />
              <MultiselectCheckboxTags
                name='planID'
                control={control}
                label='เลือกโปรแกรมสุขภาพ'
                options={getPlanOptions}
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
export default DoctorEditPatientForm;
