import { z } from 'zod';

import { baseStringValidator } from '@/components/form/validation/ZodCheck';

export type FormCreatePlanProps = {
  id: string;
  name: string;
  type: string;
  description: string;
  photo?: string;
  detail: {
    name: string[];
    day: {
      label: string;
      value: string;
    }[];
  };
};

// Create Plan Schema
export const createPlanSchema = z.object({
  name: z.string({ required_error: 'กรุณากรอกชื่อโปรแกรมสุขภาพ' }),
  type: z.string({ required_error: 'กรุณาเลือกหมวดที่ต้องการ' }),
  description: z.string(),
  photo: z.string(),
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
      .nonempty({ message: 'กรุณาเลือกวันที่ต้องการให้มีโปรแกรกมสุขภาพ' }),
  }),
});

//Type Create Plan
export type createPlanSchemaValues = z.infer<typeof createPlanSchema>;

//test
export const detailSchemaTest = z.object({
  name: baseStringValidator,
  type: baseStringValidator,
  description: z.array(
    z.object({
      value: z.string({ required_error: 'Description is required' }),
    })
  ),
  detail: z.array(
    z.object({
      name: z.string({ required_error: 'Name is required' }),
      // day: z.string({ required_error: 'Day is required' }),
    })
  ),
});

export const multicheckbox = z.object({
  day: baseStringValidator,
});

// detail: z
//   .array(
//     z.object({
//       name: z
//         .array(
//           z.object({
//             label: z.string(),
//             value: z.string({ required_error: 'Name is required' }),
//           })
//         )
//         .nonempty(),
//       day: z
//         .array(
//           z.object({
//             label: z.string(),
//             value: z.string({ required_error: 'Day is required' }),
//           })
//         )
//         .nonempty(),
//     })
//   )
//   .nonempty(),

//เพิ่มรายการ 1 รายการ
// description: z.array(
//   z.object({
//     label: z.string(),
//     value: z.string({ required_error: 'Description is required' }),
//   })
// ),

//challenge
export const challengeSchemaTest = z.object({
  name: z.string({ required_error: 'name is required' }),
  allPoints: z.string({ required_error: 'all points is required' }),
  description: z.array(
    z.object({
      title: z.string({ required_error: 'title is required' }),
      point: z.string({ required_error: 'point is required' }),
    })
  ),
});
