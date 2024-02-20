import { IQuizChallengeData } from '@/types/challenge';
import { IPlanData } from '@/types/plan';
import { IUserData } from '@/types/user';

//Add Index User
// number.ts
export const addIndexUser = (users: IUserData[] = []) =>
  users.map((user, index) => ({ ...user, index: index + 1 }));

//Add Index Plan
export const addIndexPlan = (plan: IPlanData[] = []) =>
  plan.map((plan, index) => ({ ...plan, index: index + 1 }));

//Add Index Quiz
export const addIndexQuiz = (quiz: IQuizChallengeData[] = []) =>
  quiz.map((quiz, index) => ({ ...quiz, index: index + 1 }));
