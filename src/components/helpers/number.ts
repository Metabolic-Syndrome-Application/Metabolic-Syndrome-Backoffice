import { IUserData } from '@/types/profile';

//Add Index Number
// number.ts
export const addIndex = (users: IUserData[] = []) =>
  users.map((user, index) => ({ ...user, index: index + 1 }));
