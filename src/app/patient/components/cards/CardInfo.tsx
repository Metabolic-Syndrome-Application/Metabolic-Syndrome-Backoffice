'use client';
import Image from 'next/image';
import React from 'react';

import ColorButton from '@/components/buttons/ColorButton';

import { calculateAgeThaiBuddhist } from '@/helpers/date';
import { getStatusPatientColor } from '@/helpers/status';

import { IPatientData } from '@/types/patient';

export const CardInfo = ({
  id,
  hn,
  firstName,
  lastName,
  yearOfBirth,
  gender,
  status,
  mainDoctorID,
  mainDoctor,
  assistanceDoctorID,
  assistanceDoctor,
  disease,
}: IPatientData) => {
  return (
    <div key={id} className='w-full'>
      <div className='flex flex-col items-center justify-evenly space-x-6 p-4 md:flex-col lg:flex-row'>
        <div className='flex justify-center '>
          <Image
            src='/assets/images/female.jpg'
            alt='avatar'
            className='bg-light-yellow h-[250px] w-full min-w-[250px] rounded-3xl object-contain'
            width={400}
            height={400}
            priority={false}
          />
        </div>
        <div className='flex w-full flex-col p-4'>
          <div className='flex w-full items-center justify-between'>
            <div className='space-y-2'>
              <h1 className='text-balance'>{`${firstName} ${lastName}`}</h1>
              <h4 className='text-default-gray'>รหัส HN {`${hn}`}</h4>
            </div>

            <div className=''>
              <ColorButton
                variant={getStatusPatientColor(status).color}
                size='base'
              >
                {getStatusPatientColor(status).text}
              </ColorButton>
            </div>
          </div>

          <div className='flex w-full flex-col justify-stretch gap-4 py-4 lg:flex-row lg:gap-16'>
            <div className='flex flex-col gap-4 self-start'>
              <h5 className='text-blue-500'>ข้อมูลส่วนตัว</h5>

              <div className='flex flex-col  gap-4 '>
                <div className='flex gap-2'>
                  <h5 className='text-dark-gray'>เพศ :</h5>
                  <h5> {gender === 'male' ? 'ชาย' : 'หญิง'}</h5>
                </div>

                <div className='flex gap-2'>
                  <h5 className='text-dark-gray'>อายุ :</h5>
                  <h5>{calculateAgeThaiBuddhist(yearOfBirth)}</h5>
                </div>

                <div className='flex gap-2'>
                  <h5 className='text-dark-gray'>ปีเกิด :</h5>
                  <h5 className=''>{yearOfBirth}</h5>
                </div>
              </div>
            </div>

            {/* Border visible on medium screens and larger */}
            {/* <div className='hidden lg:flex self-center h-32 border border-t-1 border-light-gray' /> */}
            <div className='flex flex-col gap-4 self-start'>
              {/* <h5 className='decoration-light-blue underline underline-offset-8'>แพทย์ผู้รับผิดชอบ</h5> */}
              <h5 className='text-blue-500'>แพทย์ผู้รับผิดชอบ</h5>
              <div className='flex flex-col  gap-4 '>
                {mainDoctor && mainDoctorID && (
                  <div key={mainDoctor.id} className='flex gap-2'>
                    <h5 className='text-dark-gray'>เเพทย์ประจำตัวหลัก :</h5>
                    <h5 className=''>
                      {`${mainDoctor.prefix}${mainDoctor.firstName} ${mainDoctor.lastName}`}{' '}
                    </h5>
                  </div>
                )}

                {assistanceDoctor && assistanceDoctorID && (
                  <div key={assistanceDoctor.id} className='flex gap-2'>
                    <h5 className='text-dark-gray'>ผู้ช่วยแพทย์ :</h5>
                    <h5 className=''>
                      {`${assistanceDoctor.prefix}${assistanceDoctor.firstName} ${assistanceDoctor.lastName}`}{' '}
                    </h5>
                  </div>
                )}

                {disease && (
                  <div className='flex gap-2'>
                    <h5 className='text-dark-gray'>โรคที่พบ :</h5>
                    <h5 className=''>{`${disease}`} </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
