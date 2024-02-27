'use client';
import RecordHealthTable from '@/app/patient/record/health-record/health-record-table/RecordHealthTable';
import React from 'react';


const HealthRecordPage = ({ id }: { id: string }) => {
  // Use the id to fetch data or perform any other operations
  return (
    <div>
      <h1>Health Record Page for ID: {id}</h1>
      <RecordHealthTable params={{ id }}></RecordHealthTable>
    </div>
  );
};

export default HealthRecordPage;
