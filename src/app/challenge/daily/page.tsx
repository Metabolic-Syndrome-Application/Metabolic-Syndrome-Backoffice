'use client';
import React from 'react';

import CreateDailyChallenge from '@/app/challenge/daily/components/create-daily-challenge/CreateDailyChallenge';
import DailyChallengeTable from '@/app/challenge/daily/components/manage-daily-table/DailyChallengeTable';

const DailyChallengePage = () => {
  return (
    <>
      <CreateDailyChallenge></CreateDailyChallenge>
      <DailyChallengeTable></DailyChallengeTable>
      {/* 
      <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div> */}
    </>
  );
};

export default DailyChallengePage;
