import React from 'react';

import CreateQuiz from '@/app/challenge/quiz/components/create-quiz/CreateQuiz';
import QuizTable from '@/app/challenge/quiz/components/manage-quiz-table/QuizTable';


const QuizChallengePage = () => {
  return (
    <>
      <div className=''>

        <CreateQuiz></CreateQuiz>
        <QuizTable></QuizTable>
      </div>
    </>
  );
};

export default QuizChallengePage;