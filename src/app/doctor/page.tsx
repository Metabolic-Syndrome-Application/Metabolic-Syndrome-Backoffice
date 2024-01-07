'use client';

import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

const DoctorPage = () => {
  // useLayoutEffect(() => {
  //   const session = sessionStatus;
  //   if (!session) {
  //     redirect('/');
  //   }
  // }, []);

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <Loader />; // Show a loader while session data is being fetched
  }

  // If the session is not loaded or the user is not authenticated, redirect to login
  if (!session || !session.user || !session.user.role) {
    router.replace('/auth/signIn'); // Redirect to your login page or the appropriate route
    return null;
  }

  return (
    <div>
      {' '}
      <span className='text-4xl font-bold'>Protected Doctor</span>
      <div className='h-12 w-full rounded-lg border border-dashed border-zinc-500'></div>
      <div className='h-64 w-full rounded-lg border border-dashed border-zinc-500'></div>
    </div>
  );
};

export default DoctorPage;
