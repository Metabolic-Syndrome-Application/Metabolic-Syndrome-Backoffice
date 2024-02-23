'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import { BackButton } from '@/components/tabbed/BackButton';

import { CardQuiz } from '@/app/challenge/components/cards/CardQuiz';
import { API_PATH } from '@/config/api';

import { IQuizChallengeData } from '@/types/challenge';
import EditQuiz from '@/app/challenge/quiz/components/create-quiz/EditQuiz';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizById, selectQuizById } from '@/redux/slices/quizsSlice';


const QuizDetailPage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  //const [userData, setUserData] = useState<IPlanData[]>([]);
  const [userData, setUserData] = useState<IQuizChallengeData | null>(null);
  const id = params.id;

  const dispatch = useDispatch<any>();
  const quiz = useSelector(selectQuizById);
  //console.log('current detail page Quiz', quiz)

  //ไม่ได้ใช้ redux
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

      <div className='shadow-light-shadow rounded-xl container mx-auto'>

        {/* <div className='flex px-8 pt-4 justify-end'>
          <FiEdit
            className='hover:bg-light-gray text-default-blue group h-5 w-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out'
          />
          แก้ไข
        </div> */}
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
