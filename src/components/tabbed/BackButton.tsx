import { useRouter } from 'next/navigation';
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';

export const BackButton = () => {
  const router = useRouter();

  return (
    <div className='text-default-gray inline-flex items-center rounded-xl py-2 pr-4'>
      <IoChevronBack onClick={() => router.back()} />
    </div>
  );
};
