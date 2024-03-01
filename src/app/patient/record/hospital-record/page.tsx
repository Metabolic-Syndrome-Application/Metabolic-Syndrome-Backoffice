'use client';
import React from 'react';
import { useDispatch } from 'react-redux';

import CreateRecordHealth from '@/app/patient/record/health-record/health-record-table/CreateRecordHealth';
import RecordHealthTable from '@/app/patient/record/health-record/health-record-table/RecordHealthTable';
import { fetchRecordHospitalById } from '@/redux/slices/recordHealthsSlice';


const HospitalRecordPage = ({ id }: { id: string }) => {

  const dispatch = useDispatch<any>();

  //ข้อมูลสุขภาพที่หมอบันทึกอย่างเดียว
  const fetchHospitalHealthRecord = (id: string) => {
    dispatch(fetchRecordHospitalById(id));
  };

  return (
    <div className='w-full'>
      <CreateRecordHealth params={{ id }} />
      <RecordHealthTable params={{ id }} fetchRecordApi={fetchHospitalHealthRecord} />
    </div>
  );
};

export default HospitalRecordPage;
