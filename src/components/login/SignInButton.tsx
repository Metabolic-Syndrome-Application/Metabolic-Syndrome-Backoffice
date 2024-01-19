'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import { API_PATH } from '@/config/api';

const SignInButton = () => {
  const { data: session, status } = useSession();
  const { enqueueSnackbar } = useSnackbar();

  const [users, setUsers] = useState();
  const axiosAuth = useAxiosAuth();
  const fetchUser = async () => {
    try {
      const res = await axiosAuth.get(API_PATH.GET_PROFILE_ME);
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session && session.user) {
    return (
      <div className='ml-auto flex gap-4'>
        <div className='flex flex-col'>
          <h1 className='text-red-600'>
            Signed in as {session.user.user.role}
          </h1>
          {/* <p className='text-wrap  text-red-600'>
            Signed in as {session.user.access_token}
          </p> */}
        </div>

        {/* <h1 className='text-red-600'>
        {/* <h1 className='text-red-600'>
          Signed in as {session.user.user.username}
        </h1> */}

        <button onClick={fetchUser} className='bg-blue-50'>
          Get all user
        </button>
        <button onClick={() => setUsers(undefined)} className='bg-blue-50'>
          Clear Users
        </button>
        {users && JSON.stringify(users)}
        {/* <Link
          href='/api/auth/signout'
          className='ml-auto flex gap-4 text-red-600'
        >
          Sign Out
        </Link> */}
        {/* <button onClick={updateSession} className='bg-blue-50'>
          Update session
        </button>
        <button onClick={() => console.log({ session })} className='bg-blue-50'>
          Log session
        </button> */}
        <button
          type='submit'
          className='bg-default-blue flex w-full items-center justify-center rounded-xl px-4 py-2  text-white'
          onClick={() => signOut()}
        >
          logout
        </button>
      </div>
    );
  }

  return (
    <div className='ml-auto flex items-center gap-4'>
      {/* <button
        type='submit'
        className='bg-default-blue flex w-full items-center justify-center rounded-xl px-4 py-2  text-white'
        onClick={() => signIn()}
      >
        login
      </button> */}
      <Link href='/auth/signIn' className='ml-auto flex gap-4 text-green-600'>
        Sign In
      </Link>
    </div>
  );
};

export default SignInButton;
