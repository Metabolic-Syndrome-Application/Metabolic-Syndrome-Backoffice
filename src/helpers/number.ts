import { IDailyChallengeData, IQuizChallengeData } from '@/types/challenge';
import { IPlanData } from '@/types/plan';
import { IUserData } from '@/types/user';

//Add Index User
// wait.ts????
export const addIndex = (users: IUserData[] = []) =>
  users.map((users, index) => ({ ...users, index: index + 1 }));

export const addIndexUser = (users: IUserData[] = []) =>
  users.map((user, index) => ({ ...user, index: index + 1 }));

//Add Index Plan
export const addIndexPlan = (plan: IPlanData[] = []) =>
  plan.map((plan, index) => ({ ...plan, index: index + 1 }));

//Add Index Quiz Challenge
export const addIndexQuiz = (quiz: IQuizChallengeData[] = []) =>
  quiz.map((quiz, index) => ({ ...quiz, index: index + 1 }));

//Add Index Daily Challenge
export const addIndexDailyChallenge = (daily: IDailyChallengeData[] = []) =>
  daily.map((daily, index) => ({ ...daily, index: index + 1 }));
