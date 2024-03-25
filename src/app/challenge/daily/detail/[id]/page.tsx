'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BackButton } from '@/components/tabbed/BackButton';

import { CardDailyChallenge } from '@/app/challenge/daily/components/cards/CardDailyChallenge';
import EditDailyChallenge from '@/app/challenge/daily/components/create-daily-challenge/EditDailyChallenge';
import {
  fetchDailyChallengeById,
  selectDailyChallengeById,
} from '@/redux/slices/dailyChallengesSlice';

const DailyDetailChallengePage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();

  const id = params.id;

  const dispatch = useDispatch<any>();
  const daily = useSelector(selectDailyChallengeById);

  const loadDailyChallenge = useCallback(async () => {
    try {
      dispatch(fetchDailyChallengeById(id));
      console.log('fetchDailyChallengeById', loadDailyChallenge);
    } catch (error) {
      console.log('error', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (session) {
      //fetchQuiz();
      dispatch(fetchDailyChallengeById(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BackButton />

      <div className='shadow-light-shadow container mx-auto rounded-xl bg-white'>
        <EditDailyChallenge params={{ id }} loadData={loadDailyChallenge} />

        {daily && (
          <div key={daily.id}>
            <CardDailyChallenge
              id={daily.id}
              name={daily?.name}
              photo={daily?.photo}
              numDays={daily?.numDays}
              points={daily?.points}
              description={daily?.description}
              detail={daily?.detail}
              status={daily?.status}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyDetailChallengePage;
