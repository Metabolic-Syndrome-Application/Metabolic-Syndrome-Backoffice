'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

import PatientTable from '@/app/patient/components/manage-patient-table/PatientTable';
import { MainPatientTabs } from '@/app/patient/components/tabs';

const PatientPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/client');
    },
  });

  if (session?.user.role !== 'staff' && session?.user.role !== 'doctor') {
    return <h1 className='text-5xl'>Access Denied</h1>;
  }

  return (
    <div className='p-4'>
      <h1>ข้อมูลคนไข้</h1>
      <MainPatientTabs></MainPatientTabs>
      <PatientTable />
    </div>
  );
};
export default PatientPage;
