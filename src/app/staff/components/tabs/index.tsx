import { Icon } from '@iconify/react';
import React from 'react';

import { SubTabbedList } from '@/components/tabbed/TabbedList';

import ProfileInfo from '@/app/staff/components/profile/ProfileInfo';
import ProfilePrivacy from '@/app/staff/components/profile/ProfilePrivacy';

import { TabConfig } from '@/types/tab';

export const ProfileTabs = () => {
  const tabConfig: TabConfig[] = [
    {
      id: 1,
      icon: <Icon icon='ic:sharp-info' width='18' height='18' />,
      name: 'จัดการประวัติส่วนตัว',
      component: <ProfileInfo />,
    },
    {
      id: 2,
      icon: <Icon icon='mdi:password' width='18' height='18' />,
      name: 'จัดการความปลอดภัยของรหัสผ่าน',
      component: <ProfilePrivacy />,
    },
  ];
  return (
    <SubTabbedList
      tabs={tabConfig}
      listClassName='shadow-light-shadow flex w-full h-fit md:flex-col rounded-xl bg-white md:max-w-[350px]'
      panelClassName='flex flex-col gap-2 md:gap-10 md:flex-row'
    />
  );
};
