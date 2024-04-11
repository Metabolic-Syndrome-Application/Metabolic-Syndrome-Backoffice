import { Icon } from '@iconify/react';
import React from 'react';

import { TabbedList } from '@/components/tabbed/TabbedList';

import HealthRecordPage from '@/app/patient/record/health-record/page';
import HospitalRecordPage from '@/app/patient/record/hospital-record/page';
import PersonalInfo from '@/app/patient/record/personal-info/page';

import { TabConfig } from '@/types/tab';

type PageProps = {
  params: {
    id: string;
  };
};

export const MainPatientTabs = ({ params }: PageProps) => {
  const tabConfig: TabConfig[] = [
    {
      id: 1,
      icon: <Icon icon='icon-park-solid:people' width='18' height='18' />,
      name: 'ข้อมูลส่วนตัว',
      component: <PersonalInfo params={params} />,
    },
    {
      id: 2,
      icon: <Icon icon='icon-park-solid:health' width='18' height='20' />,
      name: 'ข้อมูลสุขภาพ',
      component: <HealthRecordPage params={params} />,
    },
    {
      id: 3,
      icon: <Icon icon='material-symbols:stylus-note' width='18' height='22' />,
      name: 'จดบันทึกค่าสุขภาพ',
      component: <HospitalRecordPage params={params} />,
    },
  ];
  return (
    <TabbedList
      tabs={tabConfig}
      listClassName='flex w-full h-full justify-start rounded-t-lg bg-white '
      panelClassName='p-2 bg-white w-full md:min-w-screen-xl rounded-b-lg rounded-r-lg'
      allPanelClassName='flex flex-col'
      btnClassName='flex w-full h-full items-center justify-center md:justify-start'
    />
  );
};
