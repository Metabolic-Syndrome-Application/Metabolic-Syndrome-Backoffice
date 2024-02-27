"use client"
import { InputText } from '@/components/form/InputText';
import { createBMISchema, createBloodGlucoseSchema, createRecordHealthSchema, createRecordHealthValues } from '@/components/form/validation/PatientValidator'; // Import the combined schema
import { API_PATH } from '@/config/api';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const RecordHealthForm = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const axiosAuth = useAxiosAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<createRecordHealthValues>({
    mode: 'onChange',
    resolver: zodResolver(createRecordHealthSchema),
    defaultValues: {
      height: 160,
      bloodGlucose: 0,
    },
  });

  const onSubmit: SubmitHandler<createRecordHealthValues> = async (data) => {
    try {
      // Validate data against the combined schema
      const validatedData = createRecordHealthSchema.safeParse(data);

      // If validation passes, submit the data
      console.log('Validated Data:', validatedData);
      const response = await axiosAuth.post(API_PATH.POST_RECORD_HEALTH(id), data);
      enqueueSnackbar('Create Record Success', { variant: 'success' });
      reset()
    } catch (error: any) {
      // If validation fails, show an error message
      enqueueSnackbar(error.errors?.[0]?.message || 'Validation error', { variant: 'error' });
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Render input fields for both BMI and Blood Glucose records */}
      <>
        {/* BMI Input Fields */}
        <InputText
          name='height'
          label='Height'
          control={control}
          type='number'
          unit='cm'
        />
        <InputText
          name='weight'
          label='Weight'
          control={control}
          type='number'
          unit='kg'
        />
        <InputText
          name='waistline'
          label='Waistline'
          control={control}
          type='number'
          unit='in'
        />

        {/* Blood Glucose Input Fields */}
        <InputText
          name='bloodGlucose'
          label='Blood Glucose'
          control={control}
          type='number'
          unit='mg/dL'
        />

        {/* Blood Pressure Input Fields */}
        <InputText
          name='systolicBloodPressure'
          label='systolicBloodPressure '
          control={control}
          type='number'
          unit='mm/Hg'
        />
        <InputText
          name='diastolicBloodPressure'
          label='diastolicBloodPressure '
          control={control}
          type='number'
          unit='mm/Hg'
        />
        <InputText
          name='pulseRate'
          label='pulseRate '
          control={control}
          type='number'
          unit='mm/Hg'
        />

        {/* Blood Glucose Input Fields */}
        <InputText
          name='cholesterol'
          label='cholesterol '
          control={control}
          type='number'
          unit='mm/Hg'
        />
        <InputText
          name='hdl'
          label='hdl '
          control={control}
          type='number'
          unit='mm/Hg'
        />
        <InputText
          name='ldl'
          label='ldl '
          control={control}
          type='number'
          unit='mm/Hg'
        />
        <InputText
          name='triglyceride'
          label='triglyceride '
          control={control}
          type='number'
          unit='mm/Hg'
        />
      </>


      <button type="submit">Submit</button>
    </form>
  );
};

export default RecordHealthForm;

