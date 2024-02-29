'use client';
import React from 'react';
import { useDispatch } from 'react-redux';

import CreateRecordHealth from '@/app/patient/record/health-record/health-record-table/CreateRecordHealth';
import RecordHealthTable from '@/app/patient/record/health-record/health-record-table/RecordHealthTable';
import { fetchRecordHospitalById } from '@/redux/slices/recordHealthsSlice';


const HospitalRecordPage = ({ id }: { id: string }) => {

  const dispatch = useDispatch<any>();

  const fetchHospitalRecord = (id: string) => {
    dispatch(fetchRecordHospitalById(id));
  };

  return (
    <div className='w-full'>


      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h1 className='text-balance'>ข้อมูลสุขภาพ</h1>
        <CreateRecordHealth params={{ id }} />
      </article>
      <h1>Health Record Page for ID: {id}</h1>
      <RecordHealthTable params={{ id }} fetchRecordApi={fetchHospitalRecord} />


    </div>
  );
};

export default HospitalRecordPage;
