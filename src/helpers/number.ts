import { IDailyChallengeData, IQuizChallengeData } from '@/types/challenge';
import { IPatientData, IRecordHealthData } from '@/types/patient';
import { IPlanData } from '@/types/plan';
import { IUserData } from '@/types/user';

//Add Index User
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

//Add Index for 'id' Record Patient
export const addIndexRecord = (record: IRecordHealthData[] = []) =>
  record.map((record, index) => ({ ...record, id: `${index + 1}` }));

//Add Index Patient
export const addIndexPatient = (users: IPatientData[] = []) =>
  users.map((users, index) => ({ ...users, index: `${index + 1}` }));
