import { Avatar } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import FormHeaderText from '@/components/form/FormHeaderText';
import { TextFieldInfo } from '@/components/form/TextFieldInfo';
import { stringAvatar } from '@/components/layout/navbar/Avatar';

import EditProfile from '@/app/staff/components/profile/EditProfile';
import { fetchUser, selectUser } from '@/redux/slices/profileSlice';

const ProfileInfo = () => {
  const { data: session } = useSession();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const axiosAuth = useAxiosAuth();
  const user = useSelector(selectUser);

  //console.log('Staff Profile:', user);

  const dispatch = useDispatch<any>();
  const getGenderText = (gender: string) => {
    return gender === 'male' ? 'ชาย' : 'หญิง';
  };

  useEffect(() => {
    if (session && session.user) {
      // If session exists, load users
      //loadUsers();
      dispatch(fetchUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='shadow-light-shadow flex h-full w-full flex-col gap-4 rounded-xl bg-white p-4 md:w-[600px] md:px-6 md:pb-10'>
        <FormHeaderText title='ประวัติส่วนตัว' useBigestHeader />
        <div className='flex flex-col items-center justify-center gap-3'>
          <Avatar
            {...stringAvatar(user.username, 'large')}
            className='text-5xl uppercase '
          />
          <span>{user.username}</span>
        </div>

        <div className='flex flex-col space-y-6'>
          <div className='flex w-full justify-between'>
            <h4 className='indent-1.5 font-medium '>ข้อมูลผู้ใช้</h4>
            <EditProfile />
          </div>

          <TextFieldInfo label='คำนำหน้า' value={user.prefix} />
          <div className='flex gap-2'>
            <TextFieldInfo label='ชื่อจริง' value={user.firstName} />
            <TextFieldInfo label='นามสกุล' value={user.lastName} />
          </div>
          <TextFieldInfo label='เพศ' value={getGenderText(user.gender)} />
          <TextFieldInfo label='แผนก' value={user.department} />
          <TextFieldInfo label='ความเชี่ยวชาญ' value={user.specialist} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
