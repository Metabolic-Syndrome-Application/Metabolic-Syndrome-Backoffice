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
  disease
}: IPatientData) => {



  return (
    <div key={id} className='w-full'>
      <div className='flex flex-col md:flex-row items-center shadow-md p-4 rounded-lg space-x-6 lg:space-x-4'>

        <div className="flex items-start justify-center md:w-[35%] h-full gap-5">
          <Image
            src="/assets/models/male.jpg"
            alt="avatar"
            className="min-w-[250px] max-w-full h-[250px] bg-light-yellow rounded-full object-contain"
            width={400}
            height={400}
            priority={false}
          />
        </div>
        <div className='flex flex-col md:flex-row w-full items-center justify-around py-4'>
          <div className='flex md:flex-col w-full md:w-[55%] lg:w-fit md:h-[48%] justify-between md:justify-evenly gap-4'>
            <div className='space-y-3'>
              <h1 className='text-balance'>{`${firstName} ${lastName}`}</h1>
              <h4 className='text-default-gray'>รหัส HN คนไข้ : {`${hn}`}</h4>
            </div>

            <div className='สถานะ'>
              <ColorButton variant={getStatusPatientColor(status).color} size='base'>
                {getStatusPatientColor(status).text}
              </ColorButton>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row w-full lg:w-2/3 items-start lg:justify-around py-4 gap-4'>
            <div className='flex flex-col gap-4 self-start'>
              <h5 className='decoration-light-blue underline underline-offset-8'>ข้อมูลส่วนตัว</h5>

              <div className='flex flex-col  gap-4 '>
                <div className="flex gap-2">
                  <h5 className='text-dark-gray'>เพศ :</h5>
                  <h5 className=''>{gender}</h5>
                </div>

                <div className="flex gap-2">
                  <h5 className='text-dark-gray'>อายุ :</h5>
                  <h5>{calculateAgeThaiBuddhist(yearOfBirth)}</h5>
                </div>

                <div className="flex gap-2">
                  <h5 className='text-dark-gray'>ปีเกิด :</h5>
                  <h5 className=''>{yearOfBirth}</h5>
                </div>
              </div>

            </div>

            {/* Border visible on medium screens and larger */}
            <div className='hidden lg:flex self-center h-28 border border-t-4 border-slate-200 ' />


            <div className='flex flex-col gap-4 self-start '>
              <h5 className='decoration-light-blue underline underline-offset-8'>แพทย์ผู้รับผิดชอบ</h5>

              {mainDoctor && mainDoctorID && (
                <div key={mainDoctorID} className="flex gap-2">
                  <h5 className='text-dark-gray'>เเพทย์ประจำตัวหลัก :</h5>
                  <h5 className=''>{`${mainDoctor.prefix}${mainDoctor.firstName} ${mainDoctor.lastName}`} </h5>
                </div>
              )}

              {assistanceDoctor && assistanceDoctorID && (
                <div key={assistanceDoctorID} className="flex gap-2">
                  <h5 className='text-dark-gray'>ผู้ช่วยแพทย์ :</h5>
                  <h5 className=''>{`${assistanceDoctor.prefix}${assistanceDoctor.firstName} ${assistanceDoctor.lastName}`} </h5>
                </div>
              )}

              {disease && (
                <div className="flex gap-2">
                  <h5 className='text-dark-gray'>โรคที่พบ :</h5>
                  <h5 className=''>{`${disease}`} </h5>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div >
  );
};
