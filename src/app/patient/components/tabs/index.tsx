import { Icon } from '@iconify/react';
import React from 'react';

import { TabbedList } from '@/components/tabbed/TabbedList';

import HealthRecordPage from '@/app/patient/record/health-record/page';
import HospitalRecordPage from '@/app/patient/record/hospital-record/page';
import PersonalInfo from '@/app/patient/record/personal-info/PersonalInfo';

import { TabConfig } from '@/types/tab';

export const MainPatientTabs = ({ id }: { id: string }) => {

  const tabConfig: TabConfig[] = [
    {
      id: 1,
      icon: <Icon icon='icon-park-solid:people' width='18' height='18' />,
      name: 'ข้อมูลส่วนตัว',
      component: <PersonalInfo id={id} />,
    },
    {
      id: 2,
      icon: <Icon icon='icon-park-solid:health' width='18' height='20' />,
      name: 'ข้อมูลสุขภาพ',
      component: <HealthRecordPage id={id} />
    },
    {
      id: 3,
      icon: <Icon icon='material-symbols:stylus-note' width='18' height='22' />,
      name: 'จดบันทึกค่าสุขภาพ',
      component: <HospitalRecordPage id={id} />
    },
  ];
  return (
    <TabbedList
      tabs={tabConfig}
      listClassName='bg-white rounded-t-lg'
      panelClassName='bg-white p-2 shadow-light-shadow w-full md:min-w-screen-lg rounded-b-lg'
      allPanelClassName='flex flex-col'
      btnClassName='flex items-center justify-center'
    />
  );
};
