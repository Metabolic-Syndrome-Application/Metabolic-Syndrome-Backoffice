'use client';
import parse from 'html-react-parser';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoMdTime } from 'react-icons/io';
import { TbCoin } from 'react-icons/tb';

import ColorButton from '@/components/buttons/ColorButton';
import ShowImageUrl from '@/components/form/components/ShowImageUrl';
import ToggleDays from '@/components/form/components/ToggleDays';
import { TextFieldInfo } from '@/components/form/TextFieldInfo';

import { getStatusChallengeColor } from '@/helpers/status';

import { IDailyChallengeData } from '@/types/challenge';

export const CardDailyChallenge = ({
  name,
  points,
  numDays,
  description,
  photo,
  detail,
  status,
}: IDailyChallengeData) => {
  //Read more and Read Less button
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=''>
      <div className='flex min-h-[650px] w-full flex-col p-6 md:flex-row md:gap-8'>
        <div className='flex w-full flex-col gap-4 md:w-3/5'>
          {photo && (
            <div className='flex max-h-[300px] w-full items-center justify-center rounded-xl border border-dashed p-2'>
              {/* <Image
                alt='The uploaded image'
                // src={photo.startsWith('/') ? photo : `/${photo}`}
                src={photo.startsWith('/') ? photo : `/${photo}`} // Prepend leading slash if necessary
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
                src='/assets/images/challengeDefault.svg'
                alt='challengeDafault'
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

            {/* Display status color & text */}
            <ColorButton
              variant={getStatusChallengeColor(status)?.color}
              size='sm'
            >
              {getStatusChallengeColor(status)?.text}
            </ColorButton>
          </div>
          <div className='flex flex-col items-start gap-3'>
            <div className='text-dark-gray flex items-center justify-center gap-1 md:gap-2'>
              <TbCoin className='h-4 w-4' />
              <p className='text-center text-sm md:text-base'>{points} คะแนน</p>
            </div>

            <div className='text-dark-gray flex items-center justify-center gap-1 md:gap-2'>
              <IoMdTime className='h-4 w-4 text-center' />
              <p className='text-center text-sm md:text-base'>{numDays} วัน</p>
            </div>
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
