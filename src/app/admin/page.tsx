//Admin manage account doctor & staff
'use client';
import React from 'react';

import AdminCreateRegister from '@/app/admin/components/create-user/AdminCreateRegister';
import AccountUserTable from '@/app/admin/components/manage-user-table/AccountUserTable';

function AdminPage() {
  return (
    <div className='w-full'>
      <AdminCreateRegister />
      <AccountUserTable />
    </div>
  );
}

export default AdminPage;
