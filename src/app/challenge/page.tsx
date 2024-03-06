'use client';

import React from 'react';

import HomeChallengeHero from '@/components/home/HomeChallengeHero';
import HomeTypeChallenge from '@/components/home/HomeTypeChallenge';

const ChallengePage = () => {

  return (
    <div className='w-full'>

      <HomeChallengeHero />
      <HomeTypeChallenge />
    </div>
  );
};
export default ChallengePage;
