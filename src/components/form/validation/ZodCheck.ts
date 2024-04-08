import { z } from 'zod';

//validator check
export const required_error = 'กรุณากรอกข้อมูล';
export const baseStringValidator = z.string({ required_error });

export const validateMinMax = (min: number, max: number, message: string) =>
  baseStringValidator.min(min, { message }).max(max, { message });

export const passwordValidator = baseStringValidator
  .min(8, 'รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร')
  .max(20, 'รหัสผ่านควรมีความยาวไม่เกิน 20 ตัวอักษร')
  .regex(/[A-Z]/, 'รหัสผ่านควรมีตัวอักษรภาษาอังกฤษพิมพ์ใหญ่อย่างน้อย 1 ตัว')
  .regex(/[a-z]/, 'รหัสผ่านควรมีตัวอักษรภาษาอังกฤษพิมพ์เล็กอย่างน้อย 1 ตัว')
  .regex(/\d/, 'รหัสผ่านควรมีตัวเลขอย่างน้อย 1 ตัว')
  .regex(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    'รหัสผ่านควรมีตัวอักษระพิเศษอย่างน้อย 1 ตัว'
  );

export const passwordPatientValidator = z
  .string()
  .refine((password) => /^\d{4}$/.test(password), {
    message: 'รหัสผ่านต้องมีตัวเลข 4 หลัก (สามารถใช้ปีเกิดได้)',
  });

export const idCardFormatValidator = z
  .string()
  .refine((idCard) => /^\d{4} \d{4} \d{4} \d{1}$/.test(idCard), {
    message: 'รหัสบัตรประชาชนต้องมี 13 หลักและเป็นตัวเลขเท่านั้น',
  });
