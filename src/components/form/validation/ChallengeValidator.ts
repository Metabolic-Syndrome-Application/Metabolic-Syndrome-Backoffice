import { z } from 'zod';

import {
  baseStringValidator,
  validateMinMax,
} from '@/components/form/validation/ZodCheck';

//Create Quiz challenge Schema
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
        message: 'ต้องมีตัวเลือก 1 ตัวเลือกที่ถูกต้อง',
      }
    ),
});

//Type Create Quiz Challenge
export type createQuizSchemaValues = z.infer<typeof createQuizChallengeSchema>;

//------------------------------------------------------------------
// Create Daily Challenge Schema

export const createDailyChallengeSchema = z.object({
  name: z
    .string({
      required_error: 'กรุณากรอกชื่อโปรแกรมภารกิจ',
    })
    .min(2, {
      message: 'ชื่อโปรแกรมภารกิจต้องมีความยาวอย่างน้อย 2 ตัวอักษร',
    })
    .max(50, {
      message: 'ชื่อโปรแกรมภารกิจต้องมีความยาวไม่เกิน 50 ตัวอักษร',
    }),
  points: z.coerce
    .number({
      required_error: 'กรุณากรอกคะแนนสะสม',
      invalid_type_error:
        'คะแนนสะสมต้องเป็นตัวเลขเท่านั้น  และอยู่ในช่วง 50 - 500 คะแนน',
    })
    .positive()
    .gte(50, 'กรุณากรอกคะแนนสะสมขั้นต่ำ 50 คะแนน')
    .lte(500, 'กรุณากรอกคะแนนสะสมสูงสุดไม่เกิน 500 คะแนน'),
  numDays: z.coerce
    .number({
      required_error: 'กรุณาเลือกระยะเวลาแผนสุขภาพ',
      invalid_type_error:
        'ระยะเวลาแผนสุขภาพต้องเป็นตัวเลขเท่านั้น และอยู่ในช่วง 1 - 14 วัน',
    })
    .positive()
    .gte(1, 'กรุณากรอกระยะเวลาแผนสุขภาพขั้นต่ำ 1 วัน')
    .lte(14, 'กรุณากรอกระยะเวลาแผนสุขภาพไม่เกิน 14 วัน'),
  description: z.string(),
  photo: z.string({ required_error: 'กรุณาเลือกรูปที่ต้องการ' }),
  detail: z.object({
    name: z.array(
      z.object({
        name: z.string().min(1, {
          message: 'กรุณากรอกรายละเอียดภารกิจอย่างน้อย 1 ภารกิจ',
        }),
      })
    ),
    day: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .nonempty({ message: 'กรุณาเลือกวันที่ต้องการให้มีภารกิจ' }),
  }),
});
//Type Create Plan
export type createDailyChallengeValues = z.infer<
  typeof createDailyChallengeSchema
>;

// Create Daily Challenge Schema
export const updateDailyChallengeSchema = z.object({
  name: z
    .string({
      required_error: 'กรุณากรอกชื่อโปรแกรมภารกิจ',
    })
    .min(2, {
      message: 'ชื่อโปรแกรมภารกิจต้องมีความยาวอย่างน้อย 2 ตัวอักษร',
    })
    .max(50, {
      message: 'ชื่อโปรแกรมภารกิจต้องมีความยาวไม่เกิน 50 ตัวอักษร',
    }),
  points: z.coerce
    .number({
      required_error: 'กรุณากรอกคะแนนสะสม',
      invalid_type_error:
        'คะแนนสะสมต้องเป็นตัวเลขเท่านั้น  และอยู่ในช่วง 50 - 500 คะแนน',
    })
    .positive()
    .gte(50, 'กรุณากรอกคะแนนสะสมขั้นต่ำ 50 คะแนน')
    .lte(500, 'กรุณากรอกคะแนนสะสมสูงสุดไม่เกิน 500 คะแนน'),
  numDays: z.coerce
    .number({
      required_error: 'กรุณาเลือกระยะเวลาแผนสุขภาพ',
      invalid_type_error:
        'ระยะเวลาแผนสุขภาพต้องเป็นตัวเลขเท่านั้น และอยู่ในช่วง 1 - 14 วัน',
    })
    .positive()
    .gte(1, 'กรุณากรอกระยะเวลาแผนสุขภาพขั้นต่ำ 1 วัน')
    .lte(14, 'กรุณากรอกระยะเวลาแผนสุขภาพไม่เกิน 14 วัน'),
  description: z.string(),
  photo: z.string({ required_error: 'กรุณาเลือกรูปที่ต้องการ' }),
  detail: z.object({
    name: z.array(
      z.object({
        name: z.string().min(1, {
          message: 'กรุณากรอกรายละเอียดภารกิจอย่างน้อย 1 ภารกิจ',
        }),
      })
    ),
    day: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .nonempty({ message: 'กรุณาเลือกวันที่ต้องการให้มีภารกิจ' }),
  }),
  status: z.string(),
});

//Type Create Plan
export type updateDailyChallengeValues = z.infer<
  typeof updateDailyChallengeSchema
>;

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
