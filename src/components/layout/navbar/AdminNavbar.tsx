import Link from 'next/link';
import React from 'react';

//not used
const AdminNavbar = () => {
  return (
    <>
      <div className='sticky top-0 h-20 w-full bg-emerald-800'>
        <div className='container mx-auto h-full px-4'>
          <div className='flex h-full items-center justify-between'>
            AdminNavBar
            <ul className='hidden gap-x-6 text-white md:flex'>
              <li>
                <Link href='/admin'>
                  <p>Admin</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
