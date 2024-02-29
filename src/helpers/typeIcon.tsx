import { IconType } from 'react-icons';
import { CiStethoscope } from 'react-icons/ci';
import { FaRunning } from 'react-icons/fa';
import { GiNightSleep } from 'react-icons/gi';
import { PiBowlFood } from 'react-icons/pi';
import { RiMentalHealthLine } from 'react-icons/ri';

import { typePlanOptions } from '@/constant/plan';
import { HealthRecordType } from '@/types/patient';
import { Activity, HeartPulse, LucideIcon, Syringe } from 'lucide-react';
import { TbBrandSugarizer } from 'react-icons/tb';

//Type Plan : show icon and varaint color mapping
export type TypePlan = (typeof typePlanOptions)[number]['value'];

type IconTypeMapping = {
  [key in TypePlan]: { icon: IconType; variant: string; label?: string };
};

export const iconTypeMapping: IconTypeMapping = {
  food: { icon: PiBowlFood, variant: 'green', label: 'อาหาร' },
  exercise: { icon: FaRunning, variant: 'yellow', label: 'ออกกำลังกาย' },
  rest: { icon: GiNightSleep, variant: 'blue', label: 'การพักผ่อน' },
  health: { icon: RiMentalHealthLine, variant: 'orange', label: 'สุขภาพ' },
  default: { icon: CiStethoscope, variant: 'gray' },
};

// -------------------------------------------------------- //

//Type Record Health :  show label & icon ex. BMI
export const labelTypeHealth: { [key in HealthRecordType]: string } = {
  [HealthRecordType.BMI]: 'ค่าดัชนีมวลกาย',
  [HealthRecordType.BloodPressure]: 'ความดันโลหิต',
  [HealthRecordType.BloodGlucose]: 'ระดับน้ำตาล',
  [HealthRecordType.Cholesterol]: 'ไขมันในเลือด',
};

export const iconTypeHealth: { [key in HealthRecordType]: IconType | LucideIcon } = {
  [HealthRecordType.BMI]: Activity,
  [HealthRecordType.BloodPressure]: HeartPulse,
  [HealthRecordType.BloodGlucose]: TbBrandSugarizer,
  [HealthRecordType.Cholesterol]: Syringe,
};
