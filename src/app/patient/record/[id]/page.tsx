'use client';

import { useCallback, useEffect, useState } from 'react';

import { BackButton } from '@/components/tabbed/BackButton';

import { MainPatientTabs } from '@/app/patient/components/tabs';
import { fetchUser } from '@/redux/slices/profileSlice';
import { API_PATH } from '@/config/api';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';

const RecordPage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();

  const axiosAuth = useAxiosAuth()

  const id = params.id;

  const [userData, setUserData] = useState(null);


  const fetchUser = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get(
        API_PATH.GET_PROFILE_OTHER(id));
      console.log('Get 1 patient', data);
      setUserData(data.user);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }, [axiosAuth, id]); // Add axiosAuth and id as dependencies

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, []);



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

      <button onClick={() => setUserData(null)} className='bg-blue-50'>
        Clear Users
      </button>
      {userData && JSON.stringify(userData)}
    </div>
  );
};

export default RecordPage;
