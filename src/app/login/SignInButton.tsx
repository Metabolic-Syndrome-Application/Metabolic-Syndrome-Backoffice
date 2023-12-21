'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';

const SignInButton = () => {
  const { data: session, status } = useSession();

  console.log({ session, status });
  console.log('Session:', session);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session && session.user && status === 'authenticated') {
    return (
      <div className='ml-auto flex gap-4'>
        <h1 className='text-red-600'>Signed in as {session.user.role}</h1>
        <h1 className='text-red-600'>Signed in as {session.user.username}</h1>
        <Link
          href='/api/auth/signout'
          className='ml-auto flex gap-4 text-red-600'
        >
          Sign Out
        </Link>
      </div>
    );
  }

  return (
    <div className='ml-auto flex items-center gap-4'>
      <Link
        href='/api/auth/signin'
        className='ml-auto flex gap-4 text-green-600'
      >
        Sign In
      </Link>
      <Link
        href='/signup'
        className='ml-auto flex gap-4 rounded bg-green-600 p-2 text-green-200'
      >
        Sign Up
      </Link>
    </div>
  );
};

export default SignInButton;
