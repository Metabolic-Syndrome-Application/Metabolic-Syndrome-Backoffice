'use client';

import parse from 'html-react-parser';
import Image from 'next/image';
import React, { useState } from 'react';

import OutlineButton from '@/components/buttons/OutlineButton';
import ShowImageUrl from '@/components/form/components/ShowImageUrl';
import ToggleDays from '@/components/form/components/ToggleDays';
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
    <div className='flex min-h-[650px] w-full flex-col p-6 md:flex-row md:gap-8'>
      {/* section 1 */}
      <div className='flex w-full flex-col gap-4 md:w-2/5'>
        {photo && (
          <div className='flex max-h-[300px] w-full items-center justify-center rounded-xl border border-dashed p-2'>
            {/* <Image
              alt='The uploaded image'
              // src={photo.startsWith('/') ? photo : `${photo}`}
              src={photo.startsWith('/') || photo.startsWith('http://') || photo.startsWith('https://') ? photo : `/${photo}`}
              // src={photo}

              width={350}
              height={350}
              className='h-64 w-64 object-contain'
              priority={false}
            /> */}
            <ShowImageUrl pathName={photo} />
          </div>
        )}
        {!photo && (
          <div className='flex min-h-[300px] w-full items-center justify-center rounded-xl border border-dashed p-2'>
            <Image
              src='/assets/images/planDefault.svg'
              alt='planDefault'
              className='h-56 w-56'
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
        <div className='ProseMirror ProseMirror hr textEditor border-none'>
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
        </div>
      </div>

      {/* section 2 */}
      <div className='flex w-full flex-col gap-6 md:w-3/5'>
        <h5 className='font-medium'>รายละเอียดของแต่ละวัน</h5>
        <ToggleDays name='วัน' dayValue={detail?.day} />

        <h5 className='font-medium'>รายการ</h5>
        <TextFieldInfo label='' value={detail?.name} />
      </div>
    </div>
  );
};
