import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HomeTypeChallenge = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6 py-6 w-full'>
      <div className='bg-gradient-to-b from-light-blue to-blue-300 flex flex-col bg-light-blue rounded-xl justify-center items-center w-full md:w-[60px]'>
        <span className="text-lg  font-semibold md:transform md:-rotate-90 whitespace-no-wrap">รูปแบบ</span>
      </div>

      <div className='flex justify-between w-full'>
        <Link href='/challenge/daily'>
          <div className='w-full h-full bg-light-yellow hover:bg-default-yellow flex flex-col-reverse items-center justify-between rounded-xl px-6 py-6 md:flex-row'>
            <div className='whitespace-pre-line flex flex-col flex-grow items-start h-full gap-4 py-6'>
              <h2 className="font-semibold">ภารกิจทั่วไป</h2>
              <h4 className="text-default-gray">สร้างภารกิจและความท้าทายต่างๆ</h4>
            </div>
            <div className="flex flex-col items-end  gap-3">
              <Image
                src='/assets/images/dailyChallenge.png'
                alt='daily'
                className="w-[250px] h-[250px] rounded-xl object-cover p-2"
                width={400}
                height={400}
                priority={false}
              />
            </div>
          </div>
        </Link>

        <Link href='/challenge/quiz'>
          <div className='w-full h-full bg-pink-200 hover:bg-pink-300 flex flex-col-reverse items-center justify-between rounded-xl px-6 py-6 md:flex-row'>
            <div className='whitespace-pre-line flex flex-col flex-grow items-start h-full gap-4 py-6'>
              <h2 className="font-semibold">ภารกิจตอบคำถาม</h2>
              <h4 className="text-default-gray">สร้างคำถามประจำวัน</h4>
            </div>
            <div className="flex flex-col items-end  gap-3">
              <Image
                src='/assets/images/quizChallenge.png'
                alt='daily'
                className="w-[250px] h-[250px] rounded-xl object-cover p-2"
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
