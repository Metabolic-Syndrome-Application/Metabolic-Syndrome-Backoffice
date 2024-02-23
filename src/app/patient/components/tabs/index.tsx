import React from 'react';

import { TabbedList } from '@/components/tabbed/TabbedList';
import PersonalInfo from '@/app/patient/record/personal-info/PersonalInfo';

import { TabConfig } from '@/types/tab';
import HealthRecordPage from '@/app/patient/record/health-record/HealthRecord';

export const MainPatientTabs = () => {
  const tabConfig: TabConfig[] = [
    {
      id: 1,
      name: 'ข้อมูลส่วนตัว',
      component: <PersonalInfo />,
    },
    {
      id: 2,
      name: 'ข้อมูลสุขภาพ',
      component: <HealthRecordPage />,
    },
  ];
  return (
    <TabbedList
      tabs={tabConfig}
      panelClassName='container w-full p-2 shadow-light-shadow bg-white rounded-lg'
      allPanelClassName='flex flex-col gap-2 md:gap-4'
    />
  );
};
