'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import { IconFlatButton } from '@/components/buttons/IconFlatButton';
import FormHeaderText from '@/components/form/components/FormHeaderText';
import { InputText } from '@/components/form/InputText';
import { MultiselectCheckbox } from '@/components/form/MultiselectCheckbox';
import {
  createRecordHealthSchema,
  createRecordHealthValues,
} from '@/components/form/validation/PatientValidator'; // Import the combined schema

import { CardInputRecord } from '@/app/patient/components/cards/CardInputRecord';
import { API_PATH } from '@/config/api';
import { iconTypeHealth, labelTypeHealth } from '@/helpers/typeIcon';
import {
  fetchRecordHospitalById,
  selectRecordById,
} from '@/redux/slices/recordHealthsSlice';

import { HealthRecordType } from '@/types/patient';

const CreateRecordHealth = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const axiosAuth = useAxiosAuth();

  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  //selected type health & render fotm field
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    HealthRecordType.BMI,
  ]);

  const toggleSelectedType = useMemo(() => {
    return (type: string) => {
      setSelectedTypes((prevSelectedTypes) =>
        prevSelectedTypes.includes(type)
          ? prevSelectedTypes.filter((selectedType) => selectedType !== type)
          : [...prevSelectedTypes, type]
      );
    };
  }, [setSelectedTypes]);

  //Get lasetest record health data
  const dispatch = useDispatch<any>();

  const latestRecordData = useSelector(selectRecordById);
  const [submittedData, setSubmittedData] =
    useState<createRecordHealthValues | null>(null);

  const {
    control,
    handleSubmit,
    reset,

    formState: { errors, isDirty },
  } = useForm<createRecordHealthValues>({
    mode: 'onChange',
    resolver: zodResolver(createRecordHealthSchema),
    defaultValues: submittedData || {},
  });

  // watch current field -> not used
  // const watchedFields = watch(["height", "weight", "waistline", "hdl"]);
  // const [height, weight, waistline, hdl] = watchedFields;
  // console.log('hdl', hdl)

  //reset form to lastest record
  useEffect(() => {
    if (latestRecordData) {
      reset(latestRecordData);
    }
  }, [latestRecordData, reset]);

  const onSubmit: SubmitHandler<createRecordHealthValues> = async (data) => {
    try {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const response = await axiosAuth.post(
        API_PATH.POST_RECORD_HEALTH(id),
        data
      );
      enqueueSnackbar('Create Record Success', { variant: 'success' });
      //console.log('Record Health', response);

      await dispatch(fetchRecordHospitalById(id));
      closeModal();

      // Update submittedData with the submitted values
      setSubmittedData(data);
    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      console.error('Error:', error);
    }
  };

  const renderFormField = useMemo(
    () => (type: string) => {
      switch (type) {
        case HealthRecordType.BMI:
          return (
            <CardInputRecord key={HealthRecordType.BMI} name='ค่าดัชนีมวลกาย'>
              <InputText
                name='height'
                label='ส่วนสูง'
                control={control}
                type='number'
                unit='ซม.'
              />
              <InputText
                name='weight'
                label='น้ำหนัก'
                control={control}
                type='number'
                unit='กก.'
              />
              <InputText
                name='waistline'
                label='รอบเอว'
                control={control}
                type='number'
                unit='นิ้ว'
              />
            </CardInputRecord>
          );
        case HealthRecordType.BloodPressure:
          return (
            <CardInputRecord
              key={HealthRecordType.BloodPressure}
              name='ความดันโลหิต'
            >
              <InputText
                name='systolicBloodPressure'
                label='ช่วงหัวใจบีบตัว (ตัวบน)'
                control={control}
                type='number'
                unit='mmHg'
              />
              <InputText
                name='diastolicBloodPressure'
                label='ช่วงหัวใจคลายตัว (ตัวล่าง)'
                control={control}
                type='number'
                unit='mmHg'
              />
              <InputText
                name='pulseRate'
                label='อัตราการเต้นของหัวใจ'
                control={control}
                type='number'
                unit='ครั้ง/นาที'
              />
            </CardInputRecord>
          );
        case HealthRecordType.BloodGlucose:
          return (
            <CardInputRecord
              key={HealthRecordType.BloodGlucose}
              name='ระดับน้ำตาล'
            >
              <InputText
                name='bloodGlucose'
                label='ระดับน้ำตาล'
                control={control}
                type='number'
                unit='ซม.'
              />
            </CardInputRecord>
          );
        case HealthRecordType.Cholesterol:
          return (
            <CardInputRecord
              key={HealthRecordType.Cholesterol}
              name='ไขมันในเลือด'
            >
              <InputText
                name='cholesterol'
                label='คอเลสเตอรอล'
                control={control}
                type='number'
                unit='mg/dL'
              />
              <InputText
                name='hdl'
                label='ไขมันดี'
                control={control}
                type='number'
                unit='mg/dL'
              />
              <InputText
                name='ldl'
                label='ไขมันอันตราย'
                control={control}
                type='number'
                unit='mg/dL'
              />
              <InputText
                name='triglyceride'
                label='ไตรกลีเซอไรด์'
                control={control}
                type='number'
                unit='mg/dL'
              />
            </CardInputRecord>
          );
        default:
          return null;
      }
    },
    [control]
  );

  return (
    <div className='w-full'>
      <article className='flex w-full items-center justify-end px-4 py-2'>
        {/* <h3 className='text-balance'>ข้อมูลสุขภาพที่หมอบันทึก</h3> */}
        <IconFlatButton title='จดบันทึกค่าสุขภาพ' onClick={openModal} />
      </article>

      <Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex w-full flex-col flex-wrap rounded-lg'>
            <FormHeaderText
              icon={MdOutlineCreateNewFolder}
              title='จดบันทึกค่าสุขภาพ'
              useBigestHeader
            />
            <div className='flex flex-wrap items-center gap-4 pb-4'>
              {Object.values(HealthRecordType).map((type: HealthRecordType) => (
                <MultiselectCheckbox
                  key={type}
                  name={type}
                  control={control}
                  label={labelTypeHealth[type]}
                  isSelected={selectedTypes.includes(type)}
                  setSelectedType={toggleSelectedType}
                  icon={iconTypeHealth[type]}
                />
              ))}
            </div>

            <div className='flex flex-col space-y-4'>
              {selectedTypes.map(renderFormField)}
            </div>
            <div className='flex w-full justify-end space-x-3 p-4'>
              <ActionButton
                type='reset'
                variant='cancel'
                onClick={() => reset()}
              >
                ยกเลิก
              </ActionButton>
              <ActionButton
                type='submit'
                variant='submit'
                disabled={!isDirty || Object.keys(errors).length > 0}
              >
                บันทึก
              </ActionButton>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateRecordHealth;
