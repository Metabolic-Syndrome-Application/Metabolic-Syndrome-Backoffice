import { z } from 'zod';

import {
  baseStringValidator,
  validateMinMax,
} from '@/components/form/validation/ZodCheck';

//Quiz challenge Schema
export const createQuizChallengeSchema = z.object({
  question: validateMinMax(
    2,
    300,
    'กรุณากรอกอย่างน้อย 2 ตัวอักษร และไม่เกิน 300 ตัวอักษร'
  ),
  points: z.number({ required_error: 'กรุณากรอกคะแนนรวมภารกิจ' }),
  limitTime: z.number({
    required_error: 'กรุณากรอกคะแนนระยะเวลาในการตอบคำถาม',
  }),
  choices: z
    .array(
      z.object({
        option: z.string().min(2, {
          message: 'กรุณากรอกอย่างน้อย 2 ตัวอักษร',
        }),

        isCorrect: z.boolean({
          required_error: 'isActive is required',
          invalid_type_error: 'isActive must be a boolean',
        }),
      })
    )
    .min(2, {
      message: 'กรุณาเลือกตัวเลือกอย่างน้อย 2 ตัวเลือก',
    })
    .refine(
      (choices) => {
        const correctChoices = choices.filter((choice) => choice.isCorrect);
        return correctChoices.length >= 1 && correctChoices.length <= 1;
      },
      {
        message: 'ต้องมีตัวเลือกอย่างน้อย 1 ตัวเลือกที่ถูกต้อง',
      }
    ),
});

//Type Create Quiz Challenge
export type createQuizSchemaValues = z.infer<typeof createQuizChallengeSchema>;

/////////
// Create Challenge Schema
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
