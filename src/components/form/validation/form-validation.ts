import { z, ZodType } from 'zod';

export type FormRegisterDoctorProps = {
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  alias: string;
  firstName: string;
  lastName: string;
  gender: string;
  department: string;
  specialize: string;
  //doctor?: string | null;
};

//validator check
const required_error = 'กรุณากรอกข้อมูล';
const baseStringValidator = z.string({ required_error });

const passwordValidator = baseStringValidator
  .min(8, 'รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร')
  .max(20, 'รหัสผ่านควรมีความยาวไม่เกิน 20 ตัวอักษร')
  .regex(/[A-Z]/, 'รหัสผ่านควรมีตัวอักษรภาษาอังกฤษพิมพ์ใหญ่อย่างน้อย 1 ตัว')
  .regex(/[a-z]/, 'รหัสผ่านควรมีตัวอักษรภาษาอังกฤษพิมพ์เล็กอย่างน้อย 1 ตัว')
  .regex(/\d/, 'รหัสผ่านควรมีตัวเลขอย่างน้อย 1 ตัว')
  .regex(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    'รหัสผ่านควรมีตัวอักษระพิเศษอย่างน้อย 1 ตัว'
  );

const validateMinMax = (min: number, max: number, message: string) =>
  baseStringValidator.min(min, { message }).max(max, { message });

// Register for Doctor/Staff
export const registerDoctorSchema = z
  .object({
    role: baseStringValidator,
    email: baseStringValidator.email('กรุณากรอกอีเมลให้ถูกต้อง').trim(),
    password: passwordValidator,
    confirmPassword: passwordValidator,
    alias: validateMinMax(
      2,
      12,
      'กรุณากรอกอย่างน้อย 2 ตัวอักษร และไม่เกิน 12 ตัวอักษร'
    ).refine((val) => !/\d/.test(val), {
      message: 'นามแฝงต้องไม่มีตัวเลข (0-9)',
    }),
    firstName: validateMinMax(
      2,
      30,
      'กรุณากรอกอย่างน้อย 2 ตัวอักษร และไม่เกิน 30 ตัวอักษร'
    ),
    lastName: validateMinMax(
      2,
      30,
      'กรุณากรอกอย่างน้อย 2 ตัวอักษร และไม่เกิน 30 ตัวอักษร'
    ),
    gender: baseStringValidator,
    department: baseStringValidator,
    specialize: baseStringValidator,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'รหัสผ่านของคุณไม่ตรงกัน',
    path: ['confirmPassword'],
  });

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
