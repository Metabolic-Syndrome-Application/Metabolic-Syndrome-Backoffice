import Image from 'next/image';
import React from 'react';
import { IoGameControllerOutline } from 'react-icons/io5';

const HomeChallengeHero = () => {
  return (
    <div className='from-light-blue mt-8 flex flex-col-reverse items-center justify-evenly rounded-xl bg-gradient-to-r to-blue-400 px-6 py-6 md:flex-row'>
      <div className='flex flex-col items-center justify-center space-y-5 md:items-start'>
        <div className='text-default-blue font-bold '>
          <IoGameControllerOutline className='h-10 w-10 md:h-20 md:w-20' />
        </div>
        <h2 className='leading-snug	 text-black'>มาสร้างภารกิจกันเถอะ !</h2>

        <div className='flex space-x-2'>
          <p className='md:text-md text-base text-black '>
            มีภารกิจหลากหลายรูปแบบ เช่น <br /> ภารปิจตอบคำถามประจำวัน
            ภารกิจการท้าดวล
          </p>
        </div>
      </div>

      <div className='flex'>
        <Image
          className=' w-[250px] object-contain md:w-[350px]'
          src='/assets/images/homeChallenge.svg'
          width={350}
          height={350}
          alt='Hero'
          placeholder='blur'
          blurDataURL='/assets/images/homeChallenge.svg'
        />
      </div>
    </div>
  );
};

export default HomeChallengeHero;
