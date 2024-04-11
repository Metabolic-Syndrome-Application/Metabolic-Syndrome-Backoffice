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

//form login section
export type FormLoginProps = {
  username: string;
  password: string;
};

//form change password
export type FormChangePasswordProps = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
