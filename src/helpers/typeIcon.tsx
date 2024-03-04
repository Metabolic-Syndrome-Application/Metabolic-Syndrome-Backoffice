import { Activity, HeartPulse, LucideIcon, Syringe } from 'lucide-react';
import { IconType } from 'react-icons';
import { CiStethoscope } from 'react-icons/ci';
import { FaRunning } from 'react-icons/fa';
import { GiNightSleep } from 'react-icons/gi';
import { PiBowlFood } from 'react-icons/pi';
import { RiMentalHealthLine } from 'react-icons/ri';
import { TbBrandSugarizer } from 'react-icons/tb';

import { typePlanOptions } from '@/constant/plan';

import { DiseaseType, HealthRecordType } from '@/types/patient';

//Type Plan : show icon and varaint color mapping
export type TypePlan = (typeof typePlanOptions)[number]['value'];

type IconTypeMapping = {
  [key in TypePlan]: { icon: IconType; variant: string; label?: string; bg?: string };
};

export const iconTypeMapping: IconTypeMapping = {
  food: { icon: PiBowlFood, variant: 'green', label: 'อาหาร', bg: '#A5D1B0' },
  exercise: { icon: FaRunning, variant: 'yellow', label: 'ออกกำลังกาย', bg: '#FFE58A' },
  rest: { icon: GiNightSleep, variant: 'blue', label: 'การพักผ่อน', bg: '#C9E1FD' },
  health: { icon: RiMentalHealthLine, variant: 'orange', label: 'สุขภาพ', bg: '#FDC5B4' },
  default: { icon: CiStethoscope, variant: 'gray', bg: '#F2F2F2' },
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

//DiseaseRisk
export const labelDisease: { [key in DiseaseType]: string } = {
  [DiseaseType.diabetes]: 'โรคเบาหวาน',
  [DiseaseType.hyperlipidemia]: 'ภาวะไขมันในเลือดสูง',
  [DiseaseType.hypertension]: 'โรคความดันโลหิตสูง',
  [DiseaseType.obesity]: 'โรคอ้วน',
  [DiseaseType.metabolicLow]: 'ภาวะเมตาบอลินซินโดรม',
};

export const imgDisease: { [key in DiseaseType]: string } = {
  [DiseaseType.diabetes]: '/assets/images/diabetes.png',
  [DiseaseType.hyperlipidemia]: '/assets/images/cholesterol.png',
  [DiseaseType.hypertension]: '/assets/images/hypertension.png',
  [DiseaseType.obesity]: '/assets/images/obesity.png',
  [DiseaseType.metabolicLow]: '/assets/images/metabolic.png',
};

export const thaiLabelDiseaseRisk: { [key: string]: string } = {
  low: 'ความเสี่ยงต่ำ',
  medium: 'ความเสี่ยงปานกลาง',
  high: 'ความเสี่ยงสูง',
  metabolicLow: 'ความเสี่ยงต่ำ',
};