import { IGetPlanAllOptions } from '@/types/plan';

//Select Dropdown type plan
const typePlanOptions = [
  { label: 'อาหาร', value: 'food' },
  { label: 'ออกกำลังกาย ', value: 'exercise' },
  { label: 'การพักผ่อน', value: 'rest' },
  { label: 'สุขภาพ', value: 'health' },
];

// Day of week
const DaysOfWeekOptions = [
  { label: 'วันจันทร์', value: 'monday' },
  { label: 'วันอังคาร', value: 'tuesday' },
  { label: 'วันพุธ', value: 'wednesday' },
  { label: 'วันพฤหัสบดี', value: 'thursday' },
  { label: 'วันศุกร์', value: 'friday' },
  { label: 'วันเสาร์', value: 'saturday' },
];

//Get All Plan Options
const getPlanOptions = (options: IGetPlanAllOptions[]) => {
  return options.map((option) => ({
    label: `${option.name}`,
    value: option.id,
  }));
};

//const getPlanOption = options.map(option) => option.name.map((item)=> item.name)
// const getDoctorOptions = (options: IGetDoctorOptions[]) => {
//   return options.map((option) => ({
//     label: `${option.prefix}${option.firstName} ${option.lastName}`,
//     value: option.id,
//   }));
// };

// const DaysOfWeekOptions = [
//   { label: 'วันจันทร์', value: 'monday' },
//   { label: 'วันอังคาร', value: 'tuesday' },
//   { label: 'วันพุธ', value: 'wednesday' },
//   { label: 'วันพฤหัสบดี', value: 'thursday' },
//   { label: 'วันศุกร์', value: 'friday' },
//   { label: 'วันเสาร์', value: 'saturday' },
// ];

export { DaysOfWeekOptions, getPlanOptions, typePlanOptions };
