'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import { IconFlatButton } from '@/components/buttons/IconFlatButton';

import PatientTable from '@/app/patient/components/manage-patient-table/PatientTable';
import CreatePatient from '@/app/patient/components/multi-step-form/register-patients/form-patient';

const PatientPage = () => {
  const { data: session } = useSession({
    required: true,
    // onUnauthenticated() {
    //   redirect('/api/auth/signin?callbackUrl=/client');
    // },
  });

  if (session?.user.role !== 'staff' && session?.user.role !== 'doctor') {
    return <h1 className='text-5xl'>Access Denied</h1>;
  }

  return (
    <div className='p-4'>

      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h1 className='text-balance'>ข้อมูลคนไข้</h1>
        <IconFlatButton
          title='เพิ่มข้อมูลคนไข้'
        />
      </article>
      <CreatePatient></CreatePatient>
      {/* <TestCreatePatient></TestCreatePatient> */}
      <PatientTable />
    </div>
  );
};
export default PatientPage;
