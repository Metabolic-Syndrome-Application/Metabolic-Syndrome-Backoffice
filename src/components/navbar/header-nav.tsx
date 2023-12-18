'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';
import useScroll from '@/hooks/use-scroll';

const HeaderNav = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 w-full border-b border-gray-200 transition-all`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        }
      )}
    >
      <div className='flex h-[47px] items-center justify-between px-4'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/'
            className='flex flex-row items-center justify-center space-x-3 md:hidden'
          >
            <span className='h-7 w-7 rounded-lg bg-zinc-300' />
            <span className='flex text-xl font-bold '>Metaplan</span>
          </Link>
        </div>

        <div className='hidden items-center gap-4 md:flex'>
          <div>
            <span className='text-black'>Admin</span>
            <p className='text-default-gray text-sm'>โรงพยาบาล xxx</p>
          </div>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-300 text-center'>
            HQ
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
