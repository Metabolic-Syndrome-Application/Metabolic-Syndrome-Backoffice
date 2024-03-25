'use client';
import React from 'react';
import { useDispatch } from 'react-redux';

import GraphHealth from '@/app/patient/record/graph-record/GraphHealth';
import RecordHealthTable from '@/app/patient/record/health-record/health-record-table/RecordHealthTable';
import { fetchRecordAllById } from '@/redux/slices/recordHealthsSlice';

type PageProps = {
  params: {
    id: string;
  };
};

export default function HealthRecordPage({ params }: PageProps) {
  const dispatch = useDispatch<any>();

  const fetchHealthRecord = (id: string) => {
    dispatch(fetchRecordAllById(id));
  };

  return (
    <div className='w-full'>
      <GraphHealth params={params} />
      <RecordHealthTable params={params} fetchRecordApi={fetchHealthRecord} />
    </div>
  );
}
