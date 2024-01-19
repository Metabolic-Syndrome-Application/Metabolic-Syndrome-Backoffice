//user profile
export interface IUserData {
  id: string;
  username: string;
  role: string;
  prefix: string;
  firstName: string;
  lastName: string;
  gender: string;
  department: string;
  specialist: string;
}

export interface IGetProfileAllApi {
  data: {
    users: IUserData[];
  };
  status: string;
}

export interface IGetProfileMeApi {
  data: {
    user: IUserData[];
  };
  status: string;
}
