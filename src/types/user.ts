//User login
export type IUser = {
  access_token: string;
  refresh_token: string;
  status: string;
  user: {
    role: string;
    username: string;
  };
};
