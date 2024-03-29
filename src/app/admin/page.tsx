'use client';
import React from 'react';

import AdminCreateRegister from '@/app/admin/components/create-user/AdminCreateRegister';
import ManageUserTable from '@/app/admin/components/manage-user-table/AdminTable';

function AdminPage() {
  return (
    <div className='w-full'>
      <AdminCreateRegister />
      <ManageUserTable />
    </div>
  );
}

export default AdminPage;
