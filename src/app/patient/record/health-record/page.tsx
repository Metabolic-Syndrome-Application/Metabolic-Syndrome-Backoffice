'use client';
import React from 'react';
import { useDispatch } from 'react-redux';

import RecordHealthTable from '@/app/patient/record/health-record/health-record-table/RecordHealthTable';
import { fetchRecordAllById } from '@/redux/slices/recordHealthsSlice';


const HealthRecordPage = ({ id }: { id: string }) => {

  const dispatch = useDispatch<any>();

  //ข้อมูลสุขภาพจากแอปพลิเคชัน
  const fetchHealthRecord = (id: string) => {
    dispatch(fetchRecordAllById(id));
  };

  return (
    <div className='w-full'>
      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h2 className='text-balance'>ข้อมูลสุขภาพของคนไข้</h2>
      </article>

      <RecordHealthTable params={{ id }} fetchRecordApi={fetchHealthRecord} />


    </div>
  );
};

export default HealthRecordPage;
