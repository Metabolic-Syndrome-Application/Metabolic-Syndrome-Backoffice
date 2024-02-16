import { IconType } from 'react-icons';
import { CiStethoscope } from 'react-icons/ci';
import { FaRunning } from 'react-icons/fa';
import { GiNightSleep } from 'react-icons/gi';
import { PiBowlFood } from 'react-icons/pi';
import { RiMentalHealthLine } from 'react-icons/ri';

import { typePlanOptions } from '@/constant/plan';

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
