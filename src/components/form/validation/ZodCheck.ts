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

export const passwordPatientValidator = baseStringValidator
  .min(4, 'รหัสผ่านควรมีความยาวอย่างน้อย 4 ตัวอักษร')
  .max(10, 'รหัสผ่านควรมีความยาวไม่เกิน 10 ตัวอักษร');
// .regex(/[A-Z]/, 'รหัสผ่านควรมีตัวอักษรภาษาอังกฤษพิมพ์ใหญ่อย่างน้อย 1 ตัว')
// .regex(/[a-z]/, 'รหัสผ่านควรมีตัวอักษรภาษาอังกฤษพิมพ์เล็กอย่างน้อย 1 ตัว')
// .regex(/\d/, 'รหัสผ่านควรมีตัวเลขอย่างน้อย 1 ตัว')
// .regex(
//   /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
//   'รหัสผ่านควรมีตัวอักษระพิเศษอย่างน้อย 1 ตัว'
// );
