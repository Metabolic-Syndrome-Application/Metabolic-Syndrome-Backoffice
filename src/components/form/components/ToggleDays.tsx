//Show select Day -> แสดงรายละเอียดของแต่ละวัน
import React from 'react';

import { dayOfWeekThaiLabel } from '@/helpers/date';

interface Props {
  name: string;
  dayValue?: string[];
}

//styles: fix w-auto to set an element
const ToggleDays: React.FC<Props> = ({ dayValue = [] }) => {
  return (
    <div className='flex w-full flex-wrap gap-2 md:gap-4 lg:flex-nowrap'>
      {dayValue.map((day, index) => {
        const thaiDay = dayOfWeekThaiLabel(day);
        return (
          <div
            key={index}
            className='border-light-gray flex w-full flex-col items-center rounded-xl border-[1.5px] md:w-auto'
          >
            <div
              className='border-light-gray flex h-[8px] w-full items-start rounded-t-xl border-b-2 lg:h-[12px]'
              style={{ backgroundColor: thaiDay.color }}
            />
            <span className='p-2 text-sm md:text-base lg:p-4'>
              {thaiDay.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ToggleDays;
