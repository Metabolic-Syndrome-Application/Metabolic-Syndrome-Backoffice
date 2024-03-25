'use client';
import React from 'react';
import { useDispatch } from 'react-redux';

import CreateRecordHealth from '@/app/patient/record/health-record/health-record-table/CreateRecordHealth';
import RecordHealthTable from '@/app/patient/record/health-record/health-record-table/RecordHealthTable';
import { fetchRecordHospitalById } from '@/redux/slices/recordHealthsSlice';

type PageProps = {
  params: {
    id: string;
  };
};

// export async function generateStaticParams() {
//   const questions = questionsPool.family.question;

//   return questions.map((question) => ({
//     id: question.id,
//   }));
// }

const HospitalRecordPage = ({ params }: PageProps) => {
  const dispatch = useDispatch<any>();

  //ข้อมูลสุขภาพที่หมอบันทึกอย่างเดียว
  const fetchHospitalHealthRecord = (id: string) => {
    dispatch(fetchRecordHospitalById(id));
  };

  return (
    <div className='w-full'>
      <CreateRecordHealth params={params} />
      <RecordHealthTable
        params={params}
        fetchRecordApi={fetchHospitalHealthRecord}
      />
    </div>
  );
};

export default HospitalRecordPage;
