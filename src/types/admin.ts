//admin create account doctor/staff
export type FormRegisterDoctorProps = {
  role: string;
  username: string;
  password: string;
  passwordConfirm: string;
  prefix: string;
  firstName: string;
  lastName: string;
  gender: string;
  department: string;
  specialist: string;
};

//admin change profile doctor/staff
export type FormCreateProfileDoctorProps = {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  gender: string;
  department: string;
  specialist: string;
};
