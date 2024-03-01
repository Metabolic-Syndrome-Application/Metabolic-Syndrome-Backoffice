'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import { BackButton } from '@/components/tabbed/BackButton';

import { CardQuiz } from '@/app/challenge/components/cards/CardQuiz';
import EditQuiz from '@/app/challenge/quiz/components/create-quiz/EditQuiz';
import { fetchQuizById, selectQuizById } from '@/redux/slices/quizsSlice';

import { IQuizChallengeData } from '@/types/challenge';


const QuizDetailPage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  //const [userData, setUserData] = useState<IPlanData[]>([]);
  const [userData, setUserData] = useState<IQuizChallengeData | null>(null);
  const id = params.id;

  const dispatch = useDispatch<any>();
  const quiz = useSelector(selectQuizById);
  //console.log('current detail page Quiz', quiz)

  //ไม่ได้ใช้
  // const fetchQuiz = useCallback(async () => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await axiosAuth.get(API_PATH.GET_QUIZ(id as string));
  //     setUserData(data.quiz);
  //   } catch (error) {
  //     console.log('Error fetching user data:', error);
  //   }
  // }, [axiosAuth, id]);

  const loadQuizs = useCallback(async () => {
    try {
      dispatch(fetchQuizById(id));
      console.log('dispatch(fetchQuizById(id))', loadQuizs)
    } catch (error) {
      console.log('error', error);
    }
  }, [id])

  useEffect(() => {
    if (session) {
      //fetchQuiz();
      dispatch(fetchQuizById(id));
    }
  }, []);


  return (
    <div>
      <BackButton />

      <div className='bg-white shadow-light-shadow flex flex-col rounded-xl container mx-auto'>

        <EditQuiz params={{ id }} loadData={loadQuizs} />

        {/* 
        {userData && (
          <div key={userData.id} >
            <CardQuiz
              id={userData.id}
              question={userData.question}
              choices={userData.choices}
            />
          </div>
        )} */}

        {quiz && (
          <div key={quiz.id} >
            <CardQuiz
              id={quiz.id}
              question={quiz.question}
              choices={quiz.choices}
            />
          </div>
        )}
      </div>
    </div>
  );
}


export default QuizDetailPage;
