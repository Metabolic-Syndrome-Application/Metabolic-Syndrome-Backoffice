import React from 'react';

import { SubTabbedList } from '@/components/tabbed/TabbedList';

import HealthRecord from '@/app/patient/components/record/health-record/HealthRecord';
import PersonalInfo from '@/app/patient/components/record/personal-info/PersonalInfo';

import { TabConfig } from '@/types/tab';

export const MainPatientTabs = () => {
  const tabConfig: TabConfig[] = [
    {
      id: 1,
      name: 'PersonalInfo',
      component: <PersonalInfo />,
    },
    {
      id: 2,
      name: 'HealthRecord',
      component: <HealthRecord />,
    },
  ];
  return <SubTabbedList tabs={tabConfig} />;
};
