'use client';
import parse from 'html-react-parser'; // Import the parse function
import Image from 'next/image';
import React, { useState } from 'react';
import { IoMdTime } from 'react-icons/io';
import { TbCoin } from 'react-icons/tb';

import ColorButton from '@/components/buttons/ColorButton';
import ToggleDays from '@/components/form/crons/DayOfWeek';
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
  status
}: IDailyChallengeData) => {

  //Read more and Read Less button
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div className=''>
      <div className='flex w-full flex-col p-6 md:flex-row md:gap-8 min-h-[650px]'>
        <div className='flex w-full flex-col gap-4 md:w-3/5'>
          {/* <UploadImageDisplay></UploadImageDisplay> */}
          <div className='flex items-center justify-center '>
            <div className='flex items-center justify-center w-[200px]'>
              <Image
                alt="The guitarist in the concert."
                src='/assets/images/challenge.png'
                width={550}
                height={550}
                layout="responsive"
              />
            </div>
          </div>


          <div>{photo}</div>

          <div className='flex w-full flex-wrap items-center justify-between gap-2'>
            <h4 className='max-w-[280px] whitespace-pre-line text-wrap font-semibold leading-normal tracking-wide'>
              {name}
            </h4>

            {/* Display status color & text */}
            <ColorButton variant={getStatusChallengeColor(status)?.color} size='sm'>
              {getStatusChallengeColor(status)?.text}
            </ColorButton>
          </div>
          <div className='flex flex-col items-start gap-3'>
            <div className='flex items-center justify-center gap-1 md:gap-2 text-dark-gray'>
              <TbCoin className='w-4 h-4' />
              <p className='text-sm md:text-base text-center'>{points} คะแนน</p>
            </div>

            <div className='flex items-center justify-center gap-1 md:gap-2 text-dark-gray'>
              <IoMdTime className='w-4 h-4 text-center' />
              <p className='text-sm md:text-base text-center'>{numDays} วัน</p>
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
