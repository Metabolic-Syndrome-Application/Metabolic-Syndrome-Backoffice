// Profile.jsx
import { useSession } from 'next-auth/react';
import React from 'react';

import Loading from '@/app/loading';
import { ProfileTabs } from '@/app/staff/components/tabs';

const Profile = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      {session && status === 'authenticated' ? (
        <div className='w-full'>
          <ProfileTabs />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Profile;
