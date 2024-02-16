import { Icon } from '@iconify/react';
import React from 'react';

import { TabbedList } from '@/components/tabbed/TabbedList';

import QuizChallenge from '@/app/challenge/components/quiz-challenge';
import ProfileInfo from '@/app/staff/components/profile/ProfileInfo';

import { TabConfig } from '@/types/tab';

export const ChallengeTabs = () => {
  const tabConfig: TabConfig[] = [
    {
      id: 1,
      icon: <Icon icon='ic:sharp-info' width='18' height='18' />,
      name: 'ภารกิจทั่วไป',
      component: <ProfileInfo />,
    },
    {
      id: 2,
      icon: <Icon icon='mdi:password' width='18' height='18' />,
      name: 'ภารกิจประจำวัน',
      component: <QuizChallenge />,
    },
  ];
  return (
    <TabbedList
      tabs={tabConfig}
      listClassName='shadow-light-shadow flex w-full h-fit md:flex-col rounded-xl bg-white md:max-w-[350px]'
      allPanelClassName='flex flex-col gap-2 md:gap-10 md:flex-row'
    />
  );
};
