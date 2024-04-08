import { IGetPlanAllOptions } from '@/types/plan';

//Select Dropdown type plan
const typePlanOptions = [
  { id: 1, label: '🥦  อาหาร', value: 'food' },
  { id: 2, label: '🏃‍♀️  ออกกำลังกาย ', value: 'exercise' },
  { id: 3, label: '🛌  การพักผ่อน', value: 'rest' },
  { id: 4, label: '🩺  สุขภาพ', value: 'health' },
];

// Day of week
const DaysOfWeekOptions = [
  { id: 1, label: '💛 จันทร์', value: 'monday' },
  { id: 2, label: '🩷 อังคาร', value: 'tuesday' },
  { id: 3, label: '💚 พุธ', value: 'wednesday' },
  { id: 4, label: '🧡 พฤหัสบดี', value: 'thursday' },
  { id: 5, label: '💙 ศุกร์', value: 'friday' },
  { id: 6, label: '💜 เสาร์', value: 'saturday' },
  { id: 7, label: '❤️ อาทิตย์', value: 'sunday' },
];

//Get All Plan Options
const getPlanOptions = (options: IGetPlanAllOptions[]) => {
  return options.map((option) => ({
    label: `${option.name}`,
    value: option.id,
  }));
};

export { DaysOfWeekOptions, getPlanOptions, typePlanOptions };
