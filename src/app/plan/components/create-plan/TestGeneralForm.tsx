'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import ActionButton from '@/components/buttons/ActionButton';

const TestGeneralForm = () => {
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  const defaultValues = {
    description: '',
    //  detail: [{ name: '', day: '' }],
    detail: {
      name: [{ name: '' }], // Initialize name array as empty
      // day: [{ value: '', label: '' }],
      day: [],
    },
  };

  const detailSchema = z.object({
    name: z.array(z.object({ label: z.string(), value: z.string().min(1) })),
    day: z.array(z.object({ label: z.string(), value: z.string().min(1) })),
  });

  const detailSchemaTest = z.object({
    name: z.string(),
    type: z.string(),
    description: z.string(),
    // description: z.array(
    //   z.object({
    //     value: z.string({ required_error: 'Description is required' }),
    //   })
    // ),
    detail: detailSchema,

    // detail: z.array(
    //   z.object({
    //     name: z.string({ required_error: 'Name is required' }),
    //     day: z.array(z.object({ label: z.string(), value: z.string().min(1) })),
    //   })
    // ),
  });

  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(detailSchemaTest),
  });
  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const selectedDays = data.detail.day.map(
        (day: { value: string }) => day.value
      );

      const response = await axiosAuth.post(
        'http://localhost:8000/api/plan/create',
        {
          name: data.name,
          description: data.description,
          type: data.type,
          photo: data.photo,
          detail: {
            name: [data.name],
            day: selectedDays,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error); // from creation or business logic
    }
  };

  if (session && session.user) {
    return (
      <div>
        <p>test</p>
        <FormProvider {...methods}>
          <div className='grid w-[850px] grid-cols-2 gap-4'>
            {/* <Kuay></Kuay> */}
            {/* <Kuay3></Kuay3> */}
          </div>
        </FormProvider>
        <div className='my-8 flex justify-center'>
          <ActionButton type='submit' onClick={handleSubmit(onSubmit)}>
            Submit
          </ActionButton>
        </div>
      </div>
    );
  }
};

export default TestGeneralForm;
