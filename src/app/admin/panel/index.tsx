'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { IUser } from '@/types/login';

const Panel = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<IUser>();

  const fetchUserProfile = async () => {
    console.log(session);

    const res = await fetch(`/api/user/profile/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${session?.user.access_token}`,
      },
    });
    const data = await res.json();
    setUserData(data);
  };

  return (
    <div className='p-5'>
      <p className='flex items-center justify-center p-5 text-lg font-bold text-red-500'>
        This Is The Admin Panel. Only Admin Users Can Access This.
      </p>
      <button onClick={fetchUserProfile}>Get User Profile</button>

      <div className='grid grid-cols-5'>
        <p className='text-slate-600'>UserName:</p>
        <p className='col-span-4 text-sky-600'>{session?.user.user.username}</p>
        <p className='text-slate-600'>Name:</p>
        <p className='col-span-4  text-sky-600'>{session?.user.user.role}</p>
      </div>
    </div>
  );
};

export default Panel;
