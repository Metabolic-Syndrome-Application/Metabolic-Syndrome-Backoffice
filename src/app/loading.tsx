import { Metadata } from 'next';
import * as React from 'react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Loading',
};

export default function Loading() {
  return (
    <div className='absolute inset-0 flex h-screen w-full flex-col items-center justify-center bg-white'>
      <div className='flex items-center justify-center'>
        <Image
          src='/assets/images/loading.gif'
          alt='My GIF'
          className='md:[250px] lg:[350px] w-[250px]'
          width={400}
          height={400}
        />
      </div>
      <div className='repeat-infinite animate-text text-default-blue animate-pulse py-4 text-center text-3xl font-semibold tracking-wide'>
        กรุณารอสักครู่ ...
      </div>
    </div>
  );
}
