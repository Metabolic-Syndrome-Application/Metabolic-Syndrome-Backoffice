import { z } from 'zod';

import {
  baseStringValidator,
  passwordValidator,
  validateMinMax,
} from '@/components/form/validation/ZodCheck';

export interface ICreatePatientForm {
  id: string;
  role: string;
  username: string;
  password: string;
  passwordConfirm: string;
  hn: string;
  firstName: string;
  lastName: string;
  yearOfBirth: number;
  gender: string;
  mainDoctorID: string;
  mainDoctor: {
    id: string;
    prefix: string;
    firstName: string;
    lastName: string;
  };
  assistanceDoctorID?: string;
  assistanceDoctor?: {
    id: string;
    prefix: string;
    firstName: string;
    lastName: string;
  };
  disease?: string;
}
//-----------------------------------------

// Register new Patient
export const registerNewPatientSchema = z
  .object({
    role: baseStringValidator,
    username: z.string().refine((idCard) => /^\d{13}$/.test(idCard), {
      message: 'รหัสบัตรประชาชนต้องมี 13 หลักและเป็นตัวเลขเท่านั้น',
    }),
    password: passwordValidator,
    passwordConfirm: passwordValidator,
    hn: z.string().length(4),
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
    yearOfBirth: z.number(),
    mainDoctorID: baseStringValidator,
    assistanceDoctorID: z.string().optional(),
    disease: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'รหัสผ่านของคุณไม่ตรงกัน',
    path: ['passwordConfirm'],
  })
  .refine((data) => data.mainDoctorID !== data.assistanceDoctorID, {
    message:
      'แพทย์ผู้รับผิดชอบหลักและแพทย์ผู้รับผิดชอบรองต้องไม่เป็นคนเดียวกัน',
    path: ['assistanceDoctorID'],
  });

// Current Info Patient
export const registerCurrentPatientchema = z
  .object({
    hn: z.string().length(4),
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
    yearOfBirth: z.number(),
    mainDoctorID: baseStringValidator,
    assistanceDoctorID: z.string().optional(),
    disease: z.string(),
  })
  .refine((data) => data.mainDoctorID !== data.assistanceDoctorID, {
    message:
      'แพทย์ผู้รับผิดชอบหลักและแพทย์ผู้รับผิดชอบรองต้องไม่เป็นคนเดียวกัน',
    path: ['assistanceDoctorID'],
  });

// ------------------------------------------------//
//Form Record Health
export interface FormRecordHealthProps {
  id: string;
  height: number;
  weight: number;
  bmi: number;
  waistline: number;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  pulseRate: number;
  bloodGlucose: number;
  cholesterol: number;
  hdl: number;
  ldl: number;
  triglyceride: number;
}

// Create Record Health
export const createBMISchema = z.object({
  height: z.coerce
    .number({
      required_error: 'กรุณากรอกส่วนสูง',
      invalid_type_error:
        'ส่วนสูงต้องเป็นตัวเลขเท่านั้น  และอยู่ในช่วง 30 - 210 ซม.',
    })
    .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
    .positive('กรุณากรอกส่วนสูงอยู่ในช่วง 30 - 210 ซม.')
    .gte(30, 'กรุณากรอกส่วนสูงขั้นต่ำ 30 ซม.')
    .lte(210, 'กรุณากรอกส่วนสูงไม่เกิน 210 ซม.'),
  weight: z.coerce
    .number({
      required_error: 'กรุณากรอกน้ำหนัก',
      invalid_type_error:
        'น้ำหนักต้องเป็นตัวเลขเท่านั้น  และอยู่ในช่วง 20 - 200 กก.',
    })
    .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
    .positive('กรุณากรอกน้ำหนักอยู่ในช่วง 20 - 200  กก.')
    .gte(20, 'กรุณากรอกน้ำหนักขั้นต่ำ 20 กก.')
    .lte(200, 'กรุณากรอกน้ำหนักไม่เกิน 200 กก.'),
  waistline: z.coerce
    .number({
      required_error: 'กรุณากรอกรอบเอว',
      invalid_type_error:
        'รอบเอวต้องเป็นตัวเลขเท่านั้น  และอยู่ในช่วง 10 - 50 นิ้ว',
    })
    .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
    .positive('กรุณากรอกรอบเอวอยู่ในช่วง 10 - 50  นิ้ว')
    .gte(10, 'กรุณากรอกรอบเอวขั้นต่ำ 10 นิ้ว')
    .lte(50, 'กรุณากรอกรอบเอวไม่เกิน 50 นิ้ว'),
});

export const createBloodGlucoseSchema = z.object({
  bloodGlucose: z.coerce
    .number()
    .nonnegative('ตัวเลขเป็นจำนวนเต็มบวกเท่านั้น')
    .multipleOf(0.01)
    .transform((value) => (value === 0 ? undefined : value))
    .refine(
      (value) => {
        if (!value) return true;

        return value <= 300;
      },
      { message: 'กรุณากรอกระดับน้ำตาลในเลือดสูงสุดไม่เกิน 300 mg/dL' }
    )
    .transform((value) => (value === undefined ? 0 : Number(value))) // Transform undefined to 0 & set defaultValues is 0
    .optional(),
});

export const createBloodPressureSchema = z
  .object({
    systolicBloodPressure: z.coerce
      .number()
      .nonnegative('ตัวเลขเป็นจำนวนเต็มบวกเท่านั้น')
      .gte(50, 'กรุณากรอกน้ความดันช่วงหัวใจบีบตัว (ตัวบน) ขั้นต่ำ 50 กmmHg')
      .lte(
        220,
        'กรุณากรอกความดันช่วงหัวใจบีบตัว (ตัวบน) สูงสุดไม่เกิน 220 mmHg'
      ),
    diastolicBloodPressure: z.coerce
      .number()
      .nonnegative('ตัวเลขเป็นจำนวนเต็มบวกเท่านั้น')
      .gte(30, 'กรุณากรอกความดันช่วงหัวใจคลายตัว (ตัวล่าง) ขั้นต่ำ 30 กmmHg')
      .lte(
        150,
        'กรุณากรอกความดันช่วงหัวใจคลายตัว (ตัวล่าง) สูงสุดไม่เกิน 150 mmHg'
      ),
    pulseRate: z.coerce
      .number()
      .nonnegative('ตัวเลขเป็นจำนวนเต็มบวกเท่านั้น')
      .gte(20, 'กรุณากรอกอัตราการเต้นของหัวใจขั้นต่ำ 20 ครั้งต่อนาที')
      .lte(200, 'กรุณากรอกอัตราการเต้นของหัวใจสูงสุดไม่เกิน 200 ครั้งต่อนาที')
      .transform((value) => (value === undefined ? 0 : Number(value))),
  })
  // บังคับกรอก ถ้าดันกรอกอันใดอันนึงในนี้แล้ว
  .partial()
  .refine(
    (obj) => {
      const anyFieldFilled = Object.values(obj).some(
        (value) => value !== undefined && value !== null
      );
      const allFieldsFilled = Object.values(obj).every(
        (value) => value !== undefined
      );
      return !anyFieldFilled || allFieldsFilled;
    },
    {
      message: 'กรุณากรอกข้อมูล',
      path: ['pulseRate'],
    }
  )
  .transform((obj) => {
    // Set all fields to 0 if none of them are provided
    if (!Object.values(obj).some((value) => value !== undefined)) {
      return {
        systolicBloodPressure: 0,
        diastolicBloodPressure: 0,
        pulseRate: 0,
      };
    }
    return obj;
  });

export const createCholesterolSchema = z
  .object({
    cholesterol: z.coerce
      .number()
      .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
      .nonnegative('ตัวเลขเป็นจำนวนเต็มบวกเท่านั้น')
      .lte(300, 'กรุณากรอกคอเลสเตอรอลไม่เกิน 300 mg/dL')
      .optional(),
    hdl: z.coerce
      .number()
      .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
      .nonnegative('ตัวเลขเป็นจำนวนเต็มบวกเท่านั้น')
      .lte(200, 'กรุณากรอกคอเลสเตอรอลชนิดดี (HDL) ไม่เกิน 200 mg/dL')
      .optional(),
    ldl: z.coerce
      .number()
      .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
      .nonnegative('ตัวเลขเป็นจำนวนเต็มบวกเท่านั้น')
      .lte(200, 'กรุณากรอกคอเลสเตอรอลชนิดไม่ดี (LDL) ไม่เกิน 200 mg/dL')
      .optional(),
    triglyceride: z.coerce
      .number()
      .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
      .nonnegative('ตัวเลขเป็นจำนวนเต็มบวกเท่านั้น')
      .lte(1500, 'กรุณากรอกไตรกลีเซอไรด์ (TG) ไม่เกิน 1500 mg/dL')
      .optional(),
  })
  .transform((obj) => {
    // Convert undefined values to 0 & ไม่ได้บังคับกรอกทุกอันในนี้
    return {
      cholesterol: obj.cholesterol !== undefined ? obj.cholesterol : 0,
      hdl: obj.hdl !== undefined ? obj.hdl : 0,
      ldl: obj.ldl !== undefined ? obj.ldl : 0,
      triglyceride: obj.triglyceride !== undefined ? obj.triglyceride : 0,
    };
  });

export const createRecordHealthSchema = createBMISchema.and(
  createBloodGlucoseSchema
    .and(createBloodPressureSchema)
    .and(createCholesterolSchema)
);
// export const createRecordHealthSchema = z.union([
//   createBMISchema,
//   createBloodGlucoseSchema,
// ]);

export type createRecordHealthValues = z.infer<typeof createRecordHealthSchema>;

// export const createBloodPressureSchema = z.object({
//   systolicBloodPressure: z.coerce
//     .number({
//       required_error: 'กรุณากรอกความดันช่วงหัวใจบีบตัว (ตัวบน)',
//       invalid_type_error: 'ความดันต้องเป็นตัวเลขเท่านั้น',
//     })
//     .positive()
//     .gte(50, 'กรุณากรอกความดันช่วงหัวใจบีบตัว (ตัวบน) ขั้นต่ำ 50 mmHg')
//     .lte(220, 'กรุณากรอกความดันช่วงหัวใจบีบตัว (ตัวบน) สูงสุดไม่เกิน 220 mmHg'),
//   diastolicBloodPressure: z.coerce
//     .number({
//       required_error: 'กรุณากรอกความดันช่วงหัวใจคลายตัว (ตัวล่าง)',
//       invalid_type_error: 'ความดันต้องเป็นตัวเลขเท่านั้น',
//     })
//     .positive()
//     .gte(30, 'กรุณากรอกความดันช่วงหัวใจคลายตัว (ตัวล่าง) ขั้นต่ำ 30 mmHg')
//     .lte(
//       150,
//       'กรุณากรอกความดันช่วงหัวใจคลายตัว (ตัวล่าง) สูงสุดไม่เกิน 150 mmHg'
//     ),
//   pulseRate: z.coerce
//     .number({
//       required_error: 'กรุณากรอกอัตราการเต้นของหัวใจ',
//       invalid_type_error: 'อัตราการเต้นของหัวใจต้องเป็นตัวเลขเท่านั้น',
//     })
//     .positive()
//     .gte(30, 'กรุณากรอกอัตราการเต้นของหัวใจขั้นต่ำ 30 ครั้งต่อนาที')
//     .lte(200, 'กรุณากรอกอัตราการเต้นของหัวใจสูงสุดไม่เกิน 200 ครั้งต่อนาที'),
// });

// export const createBloodGlucoseSchema = z.object({
//   bloodGlucose: z.coerce
//     .number({
//       required_error: 'กรุณากรอกระดับน้ำตาลในเลือด',
//       invalid_type_error:
//         'กรุณากรอกระดับน้ำตาลในเลือดต้องเป็นตัวเลขเท่านั้น  และอยู่ในช่วง 30 - 300 mg/dL',
//     })
//     .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
//     .positive('กรุณากรอกระดับน้ำตาลในเลือดอยู่ในช่วง 30 - 300 mg/dL')
//     .gte(30, 'กรุณากรอกระดับน้ำตาลในเลือดขั้นต่ำ 30 mg/dL')
//     .lte(300, 'กรุณากรอกระดับน้ำตาลในเลือดไม่เกิน 300 mg/dL'),
// });

// export const createCholesterolSchema = z.object({
//   cholesterol: z.coerce
//     .number({
//       required_error: 'กรุณากรอกคอเลสเตอรอล',
//       invalid_type_error:
//         'กรุณาคอเลสเตอรอลต้องเป็นตัวเลขเท่านั้น  และอยู่ในช่วง 20 - 300 mg/dL',
//     })
//     .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
//     .positive('กรุณากรอกคอเลสเตอรอลอยู่ในช่วง 20 - 300 mg/dL')
//     .gte(20, 'กรุณากรอกคอเลสเตอรอลขั้นต่ำ 20 mg/dL')
//     .lte(300, 'กรุณากรอกคอเลสเตอรอลไม่เกิน 300 mg/dL'),
//   hdl: z.coerce
//     .number({
//       required_error: 'กรุณากรอกคอเลสเตอรอลชนิดดี (HDL)',
//       invalid_type_error:
//         'กรุณาคอเลสเตอรอลชนิดดี (HDL)ต้องเป็นตัวเลขเท่านั้น  และอยู่ในช่วง 20 - 200 mg/dL',
//     })
//     .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
//     .positive('กรุณากรอกคอเลสเตอรอลชนิดดี (HDL) อยู่ในช่วง 20 - 200 mg/dL')
//     .gte(20, 'กรุณากรอกคอเลสเตอรอลชนิดดี (HDL) ขั้นต่ำ 20 mg/dL')
//     .lte(200, 'กรุณากรอกคอเลสเตอรอลชนิดดี (HDL) ไม่เกิน 200 mg/dL'),
//   ldl: z.coerce
//     .number({
//       required_error: 'กรุณากรอกคอเลสเตอรอลชนิดไม่ดี (LDL)',
//       invalid_type_error:
//         'กรุณาคอเลสเตอรอลชนิดไม่ดี (LDL) ต้องเป็นตัวเลขเท่านั้น  และอยู่ในช่วง 20 - 200 mg/dL',
//     })
//     .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
//     .positive('กรุณากรอกคอเลสเตอรอลชนิดไม่ดี (LDL) อยู่ในช่วง 20 - 200 mg/dL')
//     .gte(20, 'กรุณากรอกคอเลสเตอรอลชนิดไม่ดี (LDL) ขั้นต่ำ 20 mg/dL')
//     .lte(200, 'กรุณากรอกคอเลสเตอรอลชนิดไม่ดี (LDL) ไม่เกิน 200 mg/dL'),
//   triglyceride: z.coerce
//     .number({
//       required_error: 'กรุณากรอกไตรกลีเซอไรด์ (TG)',
//       invalid_type_error:
//         'กรุณาไตรกลีเซอไรด์ (TG) ต้องเป็นตัวเลขเท่านั้น  และอยู่ในช่วง 20 - 1500 mg/dL',
//     })
//     .multipleOf(0.01, 'กรุณากรอกทศนิยมไม่เกิน 2 ตำแหน่ง')
//     .positive('กรุณากรอกไตรกลีเซอไรด์ (TG) อยู่ในช่วง 20 - 1500 mg/dL')
//     .gte(20, 'กรุณากรอกไตรกลีเซอไรด์ (TG) ขั้นต่ำ 20 mg/dL')
//     .lte(1500, 'กรุณากรอกไตรกลีเซอไรด์ (TG) ไม่เกิน 1500 mg/dL'),
// });
