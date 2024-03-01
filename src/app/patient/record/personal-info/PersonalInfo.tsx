'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import FormHeaderText from '@/components/form/FormHeaderText';

import { CardInfo } from '@/app/patient/components/cards/CardInfo';
import { API_PATH } from '@/config/api';

import { IPatientData } from '@/types/patient';

const PersonalInfo = ({ id }: { id: string }) => {
  const { data: session } = useSession();

  const axiosAuth = useAxiosAuth()

  const dispatch = useDispatch<any>();

  const [userData, setUserData] = useState<IPatientData | null>(null);

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
    <div className='w-full'>
      {userData && (
        <CardInfo
          id={userData?.id}
          hn={userData?.hn}
          firstName={userData?.firstName}
          lastName={userData?.lastName}
          yearOfBirth={userData?.yearOfBirth}
          gender={userData?.gender}
          status={userData?.status}
          mainDoctorID={userData?.mainDoctorID}
          mainDoctor={userData?.mainDoctor} />
      )}
      <FormHeaderText title='การเพิ่มสิทธิ์ให้แพทย์' useBigestHeader={false} />
      <FormHeaderText title='การปรับเปลี่ยนพฤติกรรม' useBigestHeader={false} />
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

export default PersonalInfo;