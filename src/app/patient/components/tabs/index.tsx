import React, { useCallback } from 'react';

import { TabbedList } from '@/components/tabbed/TabbedList';

import HealthRecordPage from '@/app/patient/record/health-record/page';
import PersonalInfo from '@/app/patient/record/personal-info/PersonalInfo';

import { TabConfig } from '@/types/tab';
import { fetchRecordAllById, fetchRecordHospitalById } from '@/redux/slices/recordHealthsSlice';
import { useDispatch } from 'react-redux';
import RecordHealthHospitalTable from '@/app/patient/record/health-record/health-record-table/RecordHealthHospitalTable';
import HospitalRecordPage from '@/app/patient/record/hospital-record/page';
import RecordHealthTable from '@/app/patient/record/health-record/health-record-table/RecordHealthTable';

export const MainPatientTabs = ({ id }: { id: string }) => {

  const dispatch = useDispatch<any>();


  // Define the API fetching functions
  const fetchHealthRecord = (id: string) => {
    dispatch(fetchRecordAllById(id));
  };

  const fetchHospitalRecord = (id: string) => {
    dispatch(fetchRecordHospitalById(id));
  };


  const tabConfig: TabConfig[] = [
    {
      id: 1,
      name: 'ข้อมูลส่วนตัว',
      component: <PersonalInfo />,
    },
    // {
    //   id: 2,
    //   name: 'ข้อมูลสุขภาพ',
    //   component: <HealthRecordPage id={id} />,

    // },
    // {
    //   id: 3,
    //   name: 'จดบันทึกค่าสุขภาพ',
    //   component: <HospitalRecordPage id={id} />,
    // },
    {
      id: 2,
      name: 'ข้อมูลสุขภาพ',
      component: <HealthRecordPage id={id} />
      // component: <RecordHealthTable params={{ id }} fetchRecordApi={fetchHealthRecord} />
    },
    {
      id: 3,
      name: 'จดบันทึกค่าสุขภาพ',
      component: <RecordHealthTable params={{ id }} fetchRecordApi={fetchHospitalRecord} />
    },
  ];
  return (
    <TabbedList
      tabs={tabConfig}
      panelClassName='bg-white p-2 shadow-light-shadow w-full rounded-lg'
      allPanelClassName='flex flex-col gap-2 md:gap-4'
    />
  );
};
