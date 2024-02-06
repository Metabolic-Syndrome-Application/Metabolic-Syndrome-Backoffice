import { IPlanData } from '@/types/plan';
import { IUserData } from '@/types/user';

//Add Index Number
// number.ts
export const addIndex = (users: IUserData[] = []) =>
  users.map((user, index) => ({ ...user, index: index + 1 }));

//Add Index plan
export const addIndexPlan = (plan: IPlanData[] = []) =>
  plan.map((plan, index) => ({ ...plan, index: index + 1 }));
