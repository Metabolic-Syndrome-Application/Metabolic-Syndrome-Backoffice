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

//All Users (doctor & staff)
export interface IGetProfileAllApi {
  data: {
    users: IUserData[];
  };
  status: string;
}

//Only Profile me
export interface IGetProfileMeApi {
  data: {
    user: IUserData[];
  };
  status: string;
}
