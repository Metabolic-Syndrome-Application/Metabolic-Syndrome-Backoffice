import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const HomeHero = () => {
  return (
    <div className='bg-light-blue mt-8 flex flex-col-reverse items-center justify-around rounded-xl px-6 py-6 md:flex-row'>
      <div className='flex flex-col items-center justify-center space-y-5 md:items-start'>
        <h1 className='text-dark-blue font-bold '>Metaplan</h1>
        <h2 className='leading-snug	 text-black'>
          ยินดีต้อนรับเข้าสู่เว็บปรับเปลี่ยน <br />
          พฤติกรรมเมตาบอลิกซินโดรม
        </h2>

        <div className='flex space-x-2'>
          <Icon
            icon='healthicons:medical-search-outline'
            width='24'
            height='24'
          />
          <p className='text-black '>ช่วยแนะนำ ปรับเปลี่ยน และติดตามพฤติกรรม</p>
        </div>
        <Link
          href='/api/auth/signin'
          className='bg-default-blue hover:bg-dark-blue flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white md:text-base'
        >
          เข้าใช้งาน
        </Link>
      </div>
      <div className='flex w-[250px] md:w-[350px]'>
        <Image
          src='/assets/images/doctor.svg'
          width={350}
          height={350}
          alt='Hero'
          placeholder='blur'
          blurDataURL={'/assets/images/doctor.svg'}
        />
      </div>
    </div>
  );
};

export default HomeHero;
