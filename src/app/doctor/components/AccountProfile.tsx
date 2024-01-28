import EditProfile from '@/app/doctor/components/EditProfile';
import Profile from '@/app/doctor/components/Profile';
import FormHeaderText from '@/components/form/FormHeaderText';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import React, { useState } from 'react';

const AccountProfile = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabClick = (tab: React.SetStateAction<number>) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className='flex flex-col gap-10 md:flex-row'>
        <div className='shadow-light-shadow flex h-fit w-full flex-col rounded-xl bg-white p-4 md:max-w-[350px]'>
          <FormHeaderText title='ข้อมูลส่วนตัว' useBigestHeader />

          <div className='flex flex-col gap-6'>
            <UnderlineLink
              onClick={() => handleTabClick(1)}
              className={selectedTab === 1 ? 'active' : ''}
              href={'/doctor'}
            >
              จัดการประวัติส่วนตัว
            </UnderlineLink>
            <UnderlineLink
              onClick={() => handleTabClick(2)}
              className={selectedTab === 2 ? 'active' : ''}
              href={'/doctor'}
            >
              จัดการความปลอดภัยของรหัสผ่าน
            </UnderlineLink>
          </div>
        </div>

        {/* Render data based on the selected tab */}
        {selectedTab === 1 && (
          <div className=''>
            <Profile />
          </div>
        )}
        {selectedTab === 2 && <div>Data for Button 2</div>}
      </div>
    </div>
  );
};

export default AccountProfile;
