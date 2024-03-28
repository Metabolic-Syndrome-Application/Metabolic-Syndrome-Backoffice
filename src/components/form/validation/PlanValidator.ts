import { z } from 'zod';

//wait ? check img zod check
// const MAX_FILE_SIZE = 1024 * 1024 * 5;
// const ACCEPTED_IMAGE_MIME_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ];
// const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];

// Create Plan Schema
export const createPlanSchema = z.object({
  name: z
    .string({
      required_error: 'กรุณากรอกชื่อโปรแกรมสุขภาพ',
    })
    .min(2, {
      message: 'ชื่อโปรแกรมสุขภาพต้องมีความยาวอย่างน้อย 2 ตัวอักษร',
    })
    .max(50, {
      message: 'ชื่อโปรแกรมสุขภาพต้องมีความยาวไม่เกิน 50 ตัวอักษร',
    }),
  type: z.string({ required_error: 'กรุณาเลือกหมวดที่ต้องการ' }),
  description: z.string(),
  photo: z.string({ required_error: 'กรุณาเลือกรูปที่ต้องการ' }),
  // photo: z
  //   .any()
  //   .refine((files) => {
  //     return files?.[0]?.size <= MAX_FILE_SIZE;
  //   }, `Max image size is 5MB.`)
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
  //     'Only .jpg, .jpeg, .png and .webp formats are supported.'
  //   ),
  detail: z.object({
    name: z.array(
      z.object({
        name: z.string().min(1, {
          message: 'กรุณากรอกรายละเอียดโปรแกรมอย่างน้อย 1 โปรแกรม',
        }),
      })
    ),
    day: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .nonempty({ message: 'กรุณาเลือกวันที่ต้องการให้มีโปรแกรมสุขภาพ' }),
  }),
});

//Type Create Plan
export type createPlanSchemaValues = z.infer<typeof createPlanSchema>;
