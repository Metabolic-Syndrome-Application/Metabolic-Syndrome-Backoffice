'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import { CardQuiz } from '@/app/challenge/components/cards/CardQuiz';
import { API_PATH } from '@/config/api';

import { IQuizChallengeData } from '@/types/challenge';

const PlansPage = () => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<IQuizChallengeData[]>([]); // Specify the type of plans as IQuizChallengeData[]
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const plansPerPage = 10; // Adjust the number of plans per page

  const fetchPlans = async () => {
    // Remove the parameter declaration
    try {
      const {
        data: { data },
      } = await axiosAuth.get(API_PATH.GET_QUIZ_ALL);
      console.log('test quiz', data.quiz);

      setPlans(data.quiz);
      setTotalPages(Math.ceil(data.quiz.length / plansPerPage));
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  useEffect(() => {
    fetchPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlanClick = async (id: string) => {
    router.push(`/plan/${id}`);
  };

  const renderPlans = () => {
    const startIndex = (currentPage - 1) * plansPerPage;
    const endIndex = startIndex + plansPerPage;
    return plans.slice(startIndex, endIndex).map((plan) => (
      <div key={plan.id} onClick={() => handlePlanClick(plan.id)}>
        <CardQuiz
          id={plan.id}
          question={plan.question}
          choices={plan.choices}
          points={plan.points}
          limitTime={plan.limitTime}
        />
      </div>
    ));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>All Plans</h1>
      {renderPlans()}
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
};

export default PlansPage;
