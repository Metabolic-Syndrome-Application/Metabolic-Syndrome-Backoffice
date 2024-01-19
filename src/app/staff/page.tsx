'use client';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { IGetProfileMeApi, IUserData } from '@/types/profile';
import { API_PATH } from '@/config/api';
import FormHeaderText from '@/components/form/FormHeaderText';
import { InputText } from '@/components/form/InputText';
import { RadioOption } from '@/components/form/RadioOption';
import { InputDropdown } from '@/components/form/InputDropdown';
import {
  dataOptions,
  medicalDepartment,
  medicalSpecialist,
} from '@/constant/question';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { TextField } from '@mui/material';
import UploadImageDisplay from '@/components/form/components/UploadImageDisplay';
import { IconFlatButton } from '@/components/buttons/IconFlatButton';

const StaffPage = () => {
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  const [userData, setUserData] = useState({});

  const loadUsers = async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get(API_PATH.GET_PROFILE_ME);

      console.log('get profile me', data);
      setUserData(data); // Save the user data in state
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    // Load user data when the component mounts
    loadUsers();
  }, []);

  return (
    <div>
      <span className='text-4xl font-bold'>Staff Page</span>
      <h2>ประวัติส่วนตัว</h2>
      {/* <div className='col-span-1 space-y-4 rounded-lg border p-2 md:col-span-3'>
        <FormHeaderText title='ข้อมูลส่วนตัว' />

        {userData &&
          Object.entries(userData).map(([key, value]) => (
            <TextField key={key} label={key} value={value} />
          ))}
      </div> */}
      <div className='shadow-default-shadow flex h-fit w-[450px] flex-col gap-2 rounded-xl p-4'>
        <UploadImageDisplay displayType='large' />
        <h4 className='font-medium'>โปรเเกรมความเสี่ยงต่ำ</h4>
        <div className='w-fit rounded-2xl border border-blue-200 px-2 py-1'>
          หมวดอาหาร
        </div>
        <h5 className='font-medium'>รายละเอียด</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur. Pharetra neque dolor tincidunt
          purus. Sit ultrices vulputate sed in libero tellus lectus neque
          mauris. Amet neque cursus ut nulla. Nibh facilisi sodales tristique
          tincidunt.
        </p>
        <div className='flex w-full'>
          <IconFlatButton
            title='เพิ่มลงในแผนนี้'
            //onClick={openModal}
          />
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default StaffPage;
