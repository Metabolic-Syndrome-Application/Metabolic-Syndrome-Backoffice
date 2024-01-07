import Link from 'next/link';
import React from 'react';

const DefaultNavBar = () => {
  return (
    <>
      <div className='h-full w-full bg-pink-300'>
        <div className='container mx-auto h-full px-4'>
          <div className='flex h-full items-center justify-between'>
            DefaultNavBar
            <ul className='hidden gap-x-6 text-white md:flex'>
              <li>
                <Link href='/auth/signIn'>
                  <p>login</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultNavBar;
