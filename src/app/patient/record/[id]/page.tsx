'use client';
import axios from 'axios';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BackButton } from '@/components/tabbed/BackButton';

import { MainPatientTabs } from '@/app/patient/components/tabs';
import { fetchUser } from '@/redux/slices/profileSlice';

const RecordPage = ({ params }: { params: { id: string } }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const id = params.id;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        console.log('User data:', response.data);
        setUser(response.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUser(); // Call the fetchUser function immediately when the component mounts
  }, [id]); // Add id as a dependency to ensure the effect runs when id changes

  return (
    <div>
      <div className='flex'>
        <BackButton />
        <h1>Record Page</h1>
      </div>
      <MainPatientTabs />
      <button onClick={fetchUser} className='bg-blue-50'>
        Get all user
      </button>

      {user && JSON.stringify(user)}
    </div>
  );
};

export default RecordPage;
