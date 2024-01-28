import { Avatar, Input, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import FormHeaderText from '@/components/form/FormHeaderText';
import { stringAvatar } from '@/components/layout/navbar/Avatar';

import Loading from '@/app/loading';
import { API_PATH } from '@/config/api';

import { IGetProfileMeApi, IUserData } from '@/types/profile';
import { TextFieldInfo } from '@/components/form/TextFieldInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '@/redux/slices/profileSlice';
import EditProfile from '@/app/doctor/components/EditProfile';

const Profile = () => {
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  //const [userData, setUserData] = useState<IUserData | null>(null);

  // const fetchUser = async () => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await axiosAuth.get<IGetProfileMeApi>(API_PATH.GET_PROFILE_ME);
  //     setUserData(data.user);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     fetchUser();
  //   }
  // }, [status]);

  const user = useSelector(selectUser);

  console.log('User:', user);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (session && session.user) {
      // If session exists, load users
      //loadUsers();
      dispatch(fetchUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const renderUserData = () => {
    return (
      <div className='shadow-light-shadow flex h-full w-[600px] flex-col gap-4 rounded-xl bg-white p-4'>
        <FormHeaderText title='ประวัติส่วนตัว' useBigestHeader />
        {/* <h4 className='font-medium'>ประวัติส่วนตัว</h4> */}

        <div className='flex flex-col items-center justify-center gap-2 '>
          <Avatar
            {...stringAvatar(user.username, 'large')}
            className='text-5xl uppercase '
          />
          <span>{user.username}</span>
        </div>

        <div className='flex flex-col space-y-6'>
          <div className='flex w-full justify-between'>
            <h5 className='indent-2 font-medium '>ข้อมูลผู้ใช้</h5>
            <EditProfile />
          </div>

          {/* <TextFieldInfo label='ชื่อผู้ใช้' value={user.username} /> */}
          <TextFieldInfo label='คำนำหน้า' value={user.prefix} />
          <div className='flex gap-2'>
            <TextFieldInfo label='ชื่อจริง' value={user.firstName} />
            <TextFieldInfo label='นามสกุล' value={user.lastName} />
          </div>
          <TextFieldInfo label='เพศ' value={user.gender} />
          <TextFieldInfo label='แผนก' value={user.department} />
          <TextFieldInfo label='ความเชี่ยวชาญ' value={user.specialist} />
        </div>
      </div>
    );
  };

  return (
    <div>
      {status === 'authenticated' ? (
        <div className=''>
          {user ? (
            renderUserData()
          ) : (
            <p className='col-span-2 text-center font-semibold text-gray-700'>
              No User
            </p>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Profile;