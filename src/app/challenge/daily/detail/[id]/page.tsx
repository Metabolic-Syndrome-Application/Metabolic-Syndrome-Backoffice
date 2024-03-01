'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BackButton } from '@/components/tabbed/BackButton';

import { CardDailyChallenge } from '@/app/challenge/daily/components/cards/CardDailyChallenge';
import EditDailyChallenge from '@/app/challenge/daily/components/create-daily-challenge/EditDailyChallenge';
import { fetchDailyChallengeById, selectDailyChallengeById } from '@/redux/slices/dailyChallengesSlice';


const DailyDetailChallengePage = ({ params }: { params: { id: string } }) => {

  const { data: session } = useSession();

  const id = params.id;

  const dispatch = useDispatch<any>();
  const daily = useSelector(selectDailyChallengeById);


  const loadDailyChallenge = useCallback(async () => {
    try {
      dispatch(fetchDailyChallengeById(id));
      console.log('fetchDailyChallengeById', loadDailyChallenge)
    } catch (error) {
      console.log('error', error);
    }
  }, [id])

  useEffect(() => {
    if (session) {
      //fetchQuiz();
      dispatch(fetchDailyChallengeById(id));
    }
  }, []);


  return (
    <div>
      <BackButton />

      <div className='bg-white shadow-light-shadow rounded-xl container mx-auto'>

        {/* <div className='flex px-8 pt-4 justify-end'>
          <FiEdit
            className='hover:bg-light-gray text-default-blue group h-5 w-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out'
          />
          แก้ไข
        </div> */}
        <EditDailyChallenge params={{ id }} loadData={loadDailyChallenge} />

        {daily && (
          <div key={daily.id} >
            <CardDailyChallenge
              id={daily.id}
              name={daily?.name}
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
}


export default DailyDetailChallengePage;
