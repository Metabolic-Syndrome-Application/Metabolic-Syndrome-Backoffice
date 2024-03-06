'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import Profile from '@/app/staff/components/profile/Profile';

const DoctorPage = () => {
  // useLayoutEffect(() => {
  //   const session = sessionStatus;
  //   if (!session) {
  //     redirect('/');
  //   }
  // }, []);

  //session auth
  //const { data: session, status } = useSession();
  // const router = useRouter();

  // if (status === 'loading') {
  //   return <Loader />; // Show a loader while session data is being fetched
  // }

  // // If the session is not loaded or the user is not authenticated, redirect to login
  // if (!session || !session.user || !session.user.role) {
  //   router.replace('/auth/signIn'); // Redirect to your login page or the appropriate route
  //   return null;
  // }

  return (
    <div>
      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h1 className='text-balance'>ประวัติส่วนตัว</h1>
      </article>
      <Profile />
      {/* <AccountProfile></AccountProfile> */}
      {/* <ProfileTabs></ProfileTabs> */}
      {/* <div className='h-12 w-full rounded-lg border border-dashed border-zinc-500'></div>
      <div className='h-64 w-full rounded-lg border border-dashed border-zinc-500'></div> */}
    </div>
  );
};

export default DoctorPage;
