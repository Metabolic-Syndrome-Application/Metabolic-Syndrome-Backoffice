//Admin manage account patient (have hn/no hn)
'use client';
import React from 'react';

import InfoAccountPatient from '@/app/admin/account-patient/InfoAccountlPatient';
import AccountPatientTable from '@/app/admin/components/manage-user-table/AccountPatientTable';

function AccountPatientPage() {
  return (
    <div className='w-full'>
      <InfoAccountPatient />
      <AccountPatientTable />
    </div>
  );
}

export default AccountPatientPage;
