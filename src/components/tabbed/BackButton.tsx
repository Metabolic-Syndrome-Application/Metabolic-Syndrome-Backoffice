import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';

export const BackButton = () => {
  const router = useRouter();

  return (
    <Box
    // sx={{
    //   display: 'inline-flex',
    //   alignItems: 'center',
    //   textDecorationColor: '#f0f0f0',
    //   padding: '5px',
    //   borderRadius: '5px',
    // }}
    >
      <div className='text-default-gray inline-flex items-center rounded-xl py-2 pr-4'>
        <IoChevronBack onClick={() => router.back()} />
      </div>
    </Box>
  );
};
