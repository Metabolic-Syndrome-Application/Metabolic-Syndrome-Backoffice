import dayjs from 'dayjs';

export interface dateFormatProp {
  date: Date | string;
  format: string;
}

// Format the timestamp using dayjs
export const convertDateFormat = (
  timestamp: string,
  format = 'DD/MM/YYYY HH:mm:ss'
) => {
  if (!timestamp) return '';
  return dayjs(timestamp).format(format);
};

//BirthYear
export const generateBirthYear = () => {
  const thaiBuddhistOffset = 543;
  const currentYear = new Date().getFullYear();
  const minAge = 16;
  const maxAge = 100;

  const birthYearOptions = [];

  for (let age = minAge; age <= maxAge; age++) {
    const birthYear = currentYear - age;
    const birthYearThaiBuddhist = birthYear + thaiBuddhistOffset;

    birthYearOptions.push({
      label: `${birthYearThaiBuddhist}`,
      // value: `${birthYearThaiBuddhist}`,
      value: birthYearThaiBuddhist, //yearOfBirth is number
    });
  }

  return birthYearOptions;
};

//Calculate Age from birthYearThaiBuddhist
export const calculateAgeThaiBuddhist = (birthYear: number) => {
  const thaiBuddhistOffset = 543;
  const currentYearThaiBuddhist = new Date().getFullYear() + thaiBuddhistOffset;

  return currentYearThaiBuddhist - birthYear;
};

// Convert DaysOfweek to Thai word with color
export const dayOfWeekThaiLabel = (day: string) => {
  const thaiDays: { [key: string]: { name: string; color: string } } = {
    sunday: { name: 'อาทิตย์', color: '#F8014A' },
    monday: { name: 'จันทร์', color: '#FCCB2F' },
    tuesday: { name: 'อังคาร', color: '#F9B1F0' },
    wednesday: { name: 'พุธ', color: '#3BC179' },
    thursday: { name: 'พฤหัสบดี', color: '#FD8223' },
    friday: { name: 'ศุกร์', color: '#5F97F9' },
    saturday: { name: 'เสาร์', color: '#8052BD' },
  };
  return thaiDays[day] || { name: day, color: 'white' }; // If the day is not found, return the original day name with black color
};
