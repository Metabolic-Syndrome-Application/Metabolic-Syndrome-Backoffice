//User login
export type IUser = {
  user: {
    username: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
