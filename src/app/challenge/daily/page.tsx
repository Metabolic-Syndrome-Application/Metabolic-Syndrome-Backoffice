'use client';
import React from 'react';

import CreateDailyChallenge from '@/app/challenge/daily/components/create-daily-challenge/CreateDailyChallenge';
import DailyChallengeTable from '@/app/challenge/daily/components/manage-daily-table/DailyChallengeTable';

const DailyChallengePage = () => {
  return (
    <>
      <CreateDailyChallenge></CreateDailyChallenge>
      <DailyChallengeTable></DailyChallengeTable>
    </>
  );
};

export default DailyChallengePage;
