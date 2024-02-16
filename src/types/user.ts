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
  // created_at?: string;
  // updated_at?: string;
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
    user: IUserData;
  };
  status: string;
}

//get profile doctor all
export interface IGetDoctorOptions {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
}

export interface IGetDoctorOptionsApi {
  data: {
    users: IGetDoctorOptions[];
  };
  status: string;
}
