'use client';
import GeneralForm2 from '@/app/plan/components/create-plan/GeneralFormChallenge';
import CreatePlanForm from '@/app/plan/components/create-plan';
import GeneralForm from '@/app/plan/components/create-plan/GeneralForm';
import PlanTable from '@/app/plan/components/manage-plan/PlanTable';
import ActionButton from '@/components/buttons/ActionButton';
import {
  challengeSchemaTest,
  detailSchemaTest,
} from '@/components/form/validation/PlanValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import GeneralFormChallenge from '@/app/plan/components/create-plan/GeneralFormChallenge';
import TestPlan from '@/app/plan/components/create-plan/kuay';
import Kuay from '@/app/plan/components/create-plan/kuay';

const TestGeneralForm = () => {
  const { data: session, status } = useSession();
  const defaultValues = {
    // name: '',
    // type: '',
    //description: [{ label: 'description', value: '' }],
    name: '',
    type: '',
    description: [{ value: '' }],
    detail: [{ name: '', day: 'monday' }],
  };

  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(detailSchemaTest),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (_data: typeof defaultValues) => {
    try {
      console.log('Create Plan', _data);
    } catch {}
  };

  if (session && session.user) {
    return (
      <div>
        <p>test</p>
        <FormProvider {...methods}>
          <div className='grid w-[850px] grid-cols-2 gap-4'>
            <Kuay></Kuay>
            {/* <GeneralFormChallenge /> */}
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
