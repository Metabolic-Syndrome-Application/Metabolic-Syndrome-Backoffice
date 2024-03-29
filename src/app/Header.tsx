'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <nav className='navbar navbar-light bg-light row justify-content-center sticky-top'>
      <div className='container'>
        <div className='col-3 p-0'>
          <a className='navbar-brand' style={{ marginLeft: '20px' }} href='#'>
            Next.13 Authentication
          </a>
        </div>

        <div className='col-3 mt-md-0 d-flex mt-3 flex-row text-center'>
          {session?.user ? (
            <>
              <span style={{ marginRight: '15px' }}>
                Hi, {session?.user?.user?.username}
              </span>

              <span style={{ cursor: 'pointer' }} onClick={() => signOut()}>
                {' '}
                Logout
              </span>
            </>
          ) : (
            <span style={{ marginRight: '15px' }}>
              {' '}
              <Link className='nav-link' href='/auth/signIn'>
                Login
              </Link>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
