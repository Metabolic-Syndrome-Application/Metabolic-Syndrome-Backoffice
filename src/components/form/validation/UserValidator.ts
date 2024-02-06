import { z } from 'zod';

import {
  baseStringValidator,
  passwordValidator,
  validateMinMax,
} from '@/components/form/validation/ZodCheck';

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

//Update Profile for Doctor/Staff
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
