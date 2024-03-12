'use client';
//import parse from 'html-react-parser'; // Import the parse function
import Image from 'next/image'
import React, { useState } from 'react';

import OutlineButton from '@/components/buttons/OutlineButton';
import ToggleDays from '@/components/form/crons/DayOfWeek';
import { TextFieldInfo } from '@/components/form/TextFieldInfo';

import { iconTypeMapping, TypePlan } from '@/helpers/typeIcon';

import { IPlanData } from '@/types/plan';

export const CardPlan = ({
  name,
  type,
  description,
  photo,
  detail,
}: IPlanData) => {
  const {
    icon: Icon,
    variant,
    label: thaiLabel,
  } = iconTypeMapping[type as TypePlan] || iconTypeMapping.default;
  const displayValueType = thaiLabel || type; //if label is not available

  //Read more and Read Less button
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className=''>

      <div className='flex w-full flex-col p-6 md:flex-row md:gap-8 min-h-[650px]'>
        <div className='flex w-full flex-col gap-4 md:w-3/5'>
          {photo && (
            <div className='w-full flex max-h-[300px] items-center justify-center border border-dashed rounded-xl p-2'>
              <Image
                alt="The uploaded image"
                src={photo.startsWith('/') ? photo : `${photo}`}
                width={350}
                height={350}
                className='w-64 h-64 object-contain'
                priority={false}
              />
            </div>
          )}
          {!photo && (
            <div className='w-full min-h-[300px] flex items-center justify-center border border-dashed rounded-xl p-2'>
              <Image
                src="/assets/images/planDefault.svg"
                alt="planDefault"
                className="w-56 h-56"
                width={350}
                height={350}
                priority={false}
              />
            </div>
          )}

          <div className='flex w-full flex-wrap items-center justify-between gap-2'>
            <h4 className='max-w-[280px] whitespace-pre-line text-wrap font-semibold leading-normal tracking-wide'>
              {name}
            </h4>
            <OutlineButton variant={variant} icon={Icon}>
              {displayValueType}
            </OutlineButton>
          </div>

          <h5 className='font-medium'>รายละเอียด</h5>
          {/* <div className='ProseMirror ProseMirror hr textEditor border-none'>
            {description ? (
              <>
                {parse(description.slice(0, isExpanded ? undefined : 300))}
                {description.length > 300 && (
                  <button
                    onClick={toggleExpand}
                    className='text-default-blue flex w-full cursor-pointer justify-end text-sm underline'
                  >
                    {isExpanded ? 'แสดงน้อยลง' : '...แสดงเพิ่มเติม'}
                  </button>
                )}
              </>
            ) : (
              <p className='text-default-gray text-center'>ไม่มีรายละเอียด</p>
            )}
          </div> */}
        </div>
        <div className='flex w-full flex-col gap-6'>
          <h5 className='font-medium'>รายละเอียดของแต่ละวัน</h5>
          <ToggleDays name='วัน' dayValue={detail?.day} />

          <h5 className='font-medium'>รายการ</h5>
          <TextFieldInfo label='' value={detail?.name}></TextFieldInfo>
        </div>
      </div>
    </div>

  );
};
