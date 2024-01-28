'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import useScroll from '@/hooks/useScroll';
import { useSession } from 'next-auth/react';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '@/components/layout/navbar/Avatar';

const HeaderNav = () => {
  const { data: session, status } = useSession();
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  if (status === 'authenticated')
    return (
      <div
        className={cn(
          `stick inset-x-0 top-0 z-[-1] w-full border-b border-gray-200 bg-[#FAFCFB] transition-all`,
          {
            'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
            'border-b border-gray-200 bg-white': selectedLayout,
          }
        )}
      >
        <div className='flex h-[55px] items-center justify-between bg-[#FAFCFB] px-4'>
          <div className='flex items-center space-x-4'>
            <Link
              href='/'
              className='flex flex-row items-center justify-center space-x-3 md:hidden'
            >
              <div className='flex h-7 w-7 rounded-lg'>
                <Image
                  src='/assets/icons/logo.svg'
                  width={350}
                  height={350}
                  alt='Hero'
                  priority={true}
                />
              </div>
              <span className='flex text-xl font-bold '>Metaplan</span>
            </Link>
          </div>

          <div className='hidden items-center gap-4 md:flex'>
            <div>
              <span className='capitalize text-black'>{session.user.role}</span>
              <p className='text-default-gray text-sm'>โรงพยาบาล xxx</p>
            </div>
            <div className='flex items-center justify-center rounded-full text-center uppercase'>
              <Avatar {...stringAvatar(session.user.user.username)} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default HeaderNav;
