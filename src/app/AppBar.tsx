'use client';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const AppBar = () => {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <div className='flex gap-5 bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 '>
      <Link className='text-sky-600 hover:text-sky-700' href="/">
        Home
      </Link>

      <Link className='text-sky-600 hover:text-sky-700' href="/manage-user">
        manage-user
      </Link>
      <Link className='text-sky-600 hover:text-sky-700' href="/doctor">
        doctor
      </Link>
      <Link className='text-sky-600 hover:text-sky-700' href="/patient">
        patient
      </Link>
      <Link
        className='text-sky-600 hover:text-sky-700'
        href="/middlewareside"
      >
        middlewaresides
      </Link>
      <div className='ml-auto flex gap-2'>
        {session?.user ? (
          <>
            <p className='text-sky-600'> {session.user.user.role}</p>
            <button className='text-red-500' onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <button className='text-green-600' onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default AppBar;
