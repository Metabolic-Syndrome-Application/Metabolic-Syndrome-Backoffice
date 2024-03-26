'use client';

import HomeGallery from '@/components/home/HomeGallery';

import { AvatarCanvas } from '@/app/threeD/components/AvatarCanvas';

const Hero = () => {
  return (
    <section className='relative mx-auto h-full w-full md:h-screen  '>
      <div className='absolute inset-0 top-[100px] mx-auto max-w-7xl gap-6 px-6 '>
        <div className='circlePosition z-1 absolute right-0 top-0 hidden h-[300px] w-full -translate-y-[50%] translate-x-[50%] rounded-[100%] bg-blue-500 blur-[150px] md:block lg:h-[400px] lg:w-[400px]'></div>

        <div>
          <h1 className='flex w-full flex-col justify-end gap-2 text-3xl font-extrabold text-white md:gap-8 md:text-7xl'>
            <span className='text-dark-blue leading-normal'>
              ยินดีต้อนรับเข้าสู่เว็บปรับเปลี่ยน <br /> พฤติกรรมเมตาบอลิกซินโดรม
            </span>
          </h1>
          <h2 className='my-4 hidden text-black sm:block'>
            ช่วยแนะนำ ปรับเปลี่ยน และติดตามพฤติกรรม
          </h2>
        </div>

        <div className='blurText relative z-10 w-fit rounded-lg bg-[white]/40 px-[20px] py-[10px] text-center backdrop-blur-[150px]'>
          <HomeGallery />
        </div>
        <div className='circlePosition z-1 absolute bottom-0 left-[50] h-[250px] w-[250px] rounded-[100%] bg-blue-500 blur-[200px] md:h-[300px] md:w-[350px] lg:h-[400px] lg:w-[450px]'></div>
      </div>

      <AvatarCanvas />
    </section>
  );
};

export default Hero;
