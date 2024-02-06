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
  // detail: z.string(),
});
