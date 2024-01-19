import { IUserData } from '@/types/profile';

//Add Index Number
export const addIndex = (users: IUserData[]) =>
  users.map((user, index) => ({ ...user, index: index + 1 }));
