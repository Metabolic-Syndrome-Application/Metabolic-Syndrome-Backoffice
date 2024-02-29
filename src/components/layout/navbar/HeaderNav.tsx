'use client';

import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

import { cn } from '@/lib/utils';
import useScroll from '@/hooks/useScroll';

import { stringAvatar } from '@/components/layout/navbar/Avatar';

const HeaderNav = () => {
  const { data: session, status } = useSession();
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  if (status === 'authenticated')
    return (
      <div
        className={cn(
          `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
          {
            'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
            'border-b border-gray-200 bg-white md:bg-[#F9F9F9]': selectedLayout,

          },
        )}
      >
        <div className="flex h-[55px] items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex flex-row space-x-3 items-center justify-center md:hidden"
            >
              <div className='flex h-7 w-7 rounded-lg'>
                <Image
                  src='/assets/icons/logo.svg'
                  width={350}
                  height={350}
                  alt='Hero'
                  //priority={true}
                  placeholder="blur"
                  blurDataURL="/assets/icons/logo.svg"
                  quality={95}
                />
              </div>
              <span className='flex text-xl font-bold '>Metaplan</span>
            </Link>
          </div>

          <div className="hidden items-center gap-4 md:flex flex-grow">
            <div className="flex flex-grow items-end justify-end gap-4">
              <span>
                <p className='capitalize text-black'>{session.user.role}</p>
                <p className='text-default-gray text-sm'>{session.user.user.username}</p>
              </span>
              <div className='flex items-center justify-center rounded-full text-center uppercase'>
                <Avatar {...stringAvatar(session.user.user.username)} />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
};

export default HeaderNav;
