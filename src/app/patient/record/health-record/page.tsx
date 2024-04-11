'use client';
import React from 'react';
import { useDispatch } from 'react-redux';

import HeaderArticle from '@/components/common/HeaderArticle';

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
      <section>
        <HeaderArticle
          title='ข้อมูลกราฟสุขภาพของคนไข้'
          variant='h4'
          className='bg-gray-50 px-6 py-4'
        />
        <GraphHealth params={params} />
      </section>

      <section>
        <HeaderArticle
          title='ข้อมูลตารางสุขภาพของคนไข้'
          variant='h4'
          className='bg-gray-50 px-6 py-4'
        />
        <RecordHealthTable params={params} fetchRecordApi={fetchHealthRecord} />
      </section>
    </div>
  );
}
