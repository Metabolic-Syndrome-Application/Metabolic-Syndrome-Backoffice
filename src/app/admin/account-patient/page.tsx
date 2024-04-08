//Admin manage account patient (have hn/no hn)
'use client';
import React from 'react';

import AccountPatientTable from '@/app/admin/components/manage-user-table/AccountPatientTable';

function AccountPatientPage() {
  return (
    <div className='w-full'>
      <article className='flex w-full items-center justify-between px-4 py-2'>
        <h1 className='text-balance'>จัดการบัญชีคนไข้</h1>
      </article>
      <AccountPatientTable />
    </div>
  );
}

export default AccountPatientPage;
