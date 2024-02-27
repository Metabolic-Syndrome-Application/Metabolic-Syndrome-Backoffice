import dayjs from 'dayjs';

export interface dateFormatProp {
  date: Date | string
  format: string
}

// Format the timestamp using dayjs
export const convertDateFormat = (timestamp: string, format = 'DD/MM/YYYY HH:mm:ss') => {
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
      value: `${birthYearThaiBuddhist}`,
    });
  }

  return birthYearOptions;
};

//Convert DaysOfweek to thai word
export const dayOfWeekThaiLabel = (day: string) => {
  const thaiDays: { [key: string]: string } = {
    sunday: 'วันอาทิตย์',
    monday: 'วันจันทร์',
    tuesday: 'วันอังคาร',
    wednesday: 'วันพุธ',
    thursday: 'วันพฤหัสบดี',
    friday: 'วันศุกร์',
    saturday: 'วันเสาร์',
  };
  return thaiDays[day]; // If the day is not found, return the original day name
};

