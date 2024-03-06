'use client';
import React from 'react';
import { useDispatch } from 'react-redux';

import RecordHealthTable from '@/app/patient/record/health-record/health-record-table/RecordHealthTable';
import { fetchRecordAllById } from '@/redux/slices/recordHealthsSlice';
import GraphHealth from '@/app/patient/record/graph-record/GraphHealth';


const HealthRecordPage = ({ id }: { id: string }) => {

  const dispatch = useDispatch<any>();

  //ข้อมูลสุขภาพจากแอปพลิเคชัน
  const fetchHealthRecord = (id: string) => {
    dispatch(fetchRecordAllById(id));
  };

  return (
    <div className='w-full'>

      <GraphHealth params={{ id }} />
      <RecordHealthTable params={{ id }} fetchRecordApi={fetchHealthRecord} />
    </div>
  );
};

export default HealthRecordPage;
