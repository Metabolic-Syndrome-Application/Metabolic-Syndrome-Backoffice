import { z } from 'zod';

import {
  baseStringValidator,
  validateMinMax,
} from '@/components/form/validation/ZodCheck';

export type FormCreatePlanProps = {
  id: string;
  name: string;
  type: string;
  description: string;
  photo?: string;
  detail?: DetailPlan[];
};

export type DetailPlan = {
  name: string[];
  day?: string[];
};

// Create Plan
export const createPlanSchema = z.object({
  name: validateMinMax(
    3,
    200,
    'กรุณากรอกอย่างน้อย 3 ตัวอักษร และไม่เกิน 200 ตัวอักษร'
  ),
  type: baseStringValidator,
  description: z.string(),
  // photo: z.string(),
  //detail: z.string(),
});

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
      day: z.string({ required_error: 'Day is required' }),
    })
  ),
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
