'use client';

import React from 'react';

import PatientTable from '@/app/patient/components/manage-patient-table/PatientTable';
import MultiformPatient from '@/app/patient/components/multi-step-form/page';

//All Patent Page ข้อมุลคนไข้ทั้งหมด
const PatientPage = () => {
  return (
    <div className='p-4'>
      <MultiformPatient />
      <PatientTable />
    </div>
  );
};
export default PatientPage;
