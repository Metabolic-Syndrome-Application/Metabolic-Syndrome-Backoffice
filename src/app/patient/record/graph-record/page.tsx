'use client';
import React from 'react';
import { useDispatch } from 'react-redux';

import TestChart from '@/app/patient/record/graph-record/TestChart';
import CreateRecordHealth from '@/app/patient/record/health-record/health-record-table/CreateRecordHealth';
import RecordHealthTable from '@/app/patient/record/health-record/health-record-table/RecordHealthTable';
import { fetchRecordAllById } from '@/redux/slices/recordHealthsSlice';


const GraphRecordPage = ({ id }: { id: string }) => {

  const dispatch = useDispatch<any>();

  //ข้อมูลสุขภาพจากแอปพลิเคชัน
  const fetchHealthRecord = (id: string) => {
    dispatch(fetchRecordAllById(id));
  };
  return (
    <div className='w-full'>
      <CreateRecordHealth params={{ id }} />

      <TestChart params={{ id }} />
      <RecordHealthTable params={{ id }} fetchRecordApi={fetchHealthRecord} />

    </div>
  );
};

export default GraphRecordPage;
