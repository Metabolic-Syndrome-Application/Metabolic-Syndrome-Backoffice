// import * as yup from 'yup';

// export const createTeamSchema = yup.object({
//   name: yup.string().required('Team name is required'),
//   initials: yup.string().required('Team initials is required'),
//   roleTemplate: yup.array().of(
//     yup.object().shape({
//       type: yup.string().required(),
//       value: yup.string().required('Role is required'),
//     })
//   ),
//   visions: yup.array().of(
//     yup.object().shape({
//       type: yup.string().required(),
//       value: yup.string().required('Vision is required'),
//     })
//   ),
// });

// export const registerSchema = yup.object({
//   firstName: yup.string().required(),
//   lastName: yup.string().required(),
//   phoneNumber: yup
//     .string()
//     .matches(/^[0-9]+$/, 'Must be only digits')
//     .min(10, 'Phone number must be exactly 10 digits')
//     .max(10, 'Phone number must be exactly 10 digits')
//     .typeError('Phone must be only number')
//     .required('Phone is required'),
//   email: yup.string().email().required(),
//   password: yup.string().required(),
// });

// export const loginSchema = yup.object({
//   email: yup.string().email().required(),
//   password: yup.string().required(),
// });

// export const transformTimeFormat = (date: Date) => {
//   const hours = date.getHours().toString().padStart(2, '0');
//   const minutes = date.getMinutes().toString().padStart(2, '0');

//   return `${hours}:${minutes}`;
// };

// export const transformDateFormat = (date: Date) => {
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const day = date.getDate().toString().padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

import { z, ZodType } from 'zod';

export type FormRegisterDoctorProps = {
  email: string;
  password: string;
  confirmPassword: string;
  alias: string;
  firstName: string;
  lastName: string;
  // department: string;
  // specialize: string
};

export const registerDoctorSchema: ZodType<FormRegisterDoctorProps> = z
  .object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
    alias: z.string().min(2).max(12),
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    //  age: z.number().min(16).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });
