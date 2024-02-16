import React from 'react';

import { dayOfWeekThaiLabel } from '@/helpers/date';

interface Props {
  name: string;
  dayValue?: string[]; // Add a day prop
}

const ToggleDays: React.FC<Props> = ({ name, dayValue = [] }) => {
  return (
    <div className='flex w-full items-center justify-center gap-2 md:gap-4'>
      {dayValue.map((day, index) => (
        <div
          className='border-light-gray flex w-full items-center justify-center rounded-xl border-[1.5px] '
          key={index}
        >
          <span className='flex h-fit w-full items-center justify-center text-center text-sm md:h-[80px] md:text-base lg:w-[80px]'>
            {dayOfWeekThaiLabel(day)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ToggleDays;
