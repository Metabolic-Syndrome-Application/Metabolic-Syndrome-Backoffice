'use client';

import React from 'react';

import HomeChallengeHero from '@/app/challenge/components/sections/HomeChallengeHero';
import HomeTypeChallenge from '@/app/challenge/components/sections/HomeTypeChallenge';

const ChallengePage = () => {
  return (
    <div className='w-full'>
      <HomeChallengeHero />
      <HomeTypeChallenge />
    </div>
  );
};
export default ChallengePage;
