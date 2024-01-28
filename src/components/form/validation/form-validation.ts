import { z } from 'zod';

export type FormLoginProps = {
  username: string;
  password: string;
};

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
  //doctor?: string | null;
};

export type FormCreateProfileDoctorProps = {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  gender: string;
  department: string;
  specialist: string;
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

//Login Page
export const loginSchema = z.object({
  username: baseStringValidator.email('กรุณากรอกอีเมลให้ถูกต้อง').trim(),
  password: passwordValidator,
});

// Register for Doctor/Staff
export const registerDoctorSchema = z
  .object({
    role: baseStringValidator,
    username: baseStringValidator.email('กรุณากรอกอีเมลให้ถูกต้อง').trim(),
    password: passwordValidator,
    passwordConfirm: passwordValidator,
    prefix: validateMinMax(
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
    specialist: baseStringValidator,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'รหัสผ่านของคุณไม่ตรงกัน',
    path: ['confirmPassword'],
  });

// Profile for Doctor/Staff
export const createProfileDoctorSchema = z.object({
  prefix: validateMinMax(
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
  specialist: baseStringValidator,
});
