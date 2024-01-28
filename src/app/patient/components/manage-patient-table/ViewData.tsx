'use client';
import axios from 'axios';
import React from 'react';
import { IoMdEye } from 'react-icons/io';

type ViewDataProps = {
  userId: string;
};

const ViewData = ({ userId }: ViewDataProps) => {
  const handleClick = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${userId}`
      );
      console.log('User data:', response.data);

      // Handle displaying the data, e.g., open a modal, etc.
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <IoMdEye
        className='hover:text-default-blue group cursor-pointer text-[#999999]'
        onClick={handleClick}
      />
    </div>
  );
};

export default ViewData;
