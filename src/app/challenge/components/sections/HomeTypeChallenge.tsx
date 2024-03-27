import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HomeTypeChallenge = () => {
  return (
    <div className='flex w-full flex-col gap-4 py-6 md:flex-row'>
      <div className='from-light-blue bg-light-blue flex w-full flex-col items-center justify-center rounded-xl bg-gradient-to-b to-blue-300 md:w-[60px]'>
        <span className='whitespace-no-wrap  text-lg font-semibold md:-rotate-90 md:transform'>
          รูปแบบ
        </span>
      </div>

      <div className='grid w-full justify-stretch gap-6 md:grid-flow-col'>
        <Link href='/challenge/daily'>
          <div className='bg-light-yellow hover:bg-default-yellow flex h-full w-full flex-col-reverse items-center justify-between rounded-xl px-6 py-6 md:flex-row'>
            <div className='flex w-full flex-grow flex-col items-start gap-4 whitespace-pre-line py-2 md:py-6'>
              <h2 className='font-semibold'>ภารกิจทั่วไป</h2>
              <h4 className='text-default-gray'>
                สร้างภารกิจและความท้าทายต่างๆ
              </h4>
            </div>
            <div className='flex w-full flex-col items-center justify-center gap-3'>
              <Image
                src='/assets/images/dailyChallenge.png'
                alt='daily'
                className='h-[250px] w-[250px] rounded-xl object-contain p-2'
                width={400}
                height={400}
                priority={false}
              />
            </div>
          </div>
        </Link>

        <Link href='/challenge/quiz'>
          <div className='flex h-full w-full flex-col-reverse items-center justify-between rounded-xl bg-pink-200 px-6 py-6 hover:bg-pink-300 md:flex-row'>
            <div className='flex w-full flex-grow flex-col items-start gap-4 whitespace-pre-line py-2 md:py-6'>
              <h2 className='font-semibold'>ภารกิจตอบคำถาม</h2>
              <h4 className='text-default-gray'>สร้างคำถามประจำวัน</h4>
            </div>
            <div className='flex w-full flex-col items-center justify-center gap-3'>
              <Image
                src='/assets/images/quizChallenge.png'
                alt='daily'
                className='h-[250px] w-[250px] rounded-xl object-contain p-2'
                width={400}
                height={400}
                priority={false}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeTypeChallenge;
