'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

import PlanTable from '@/app/plan/components/manage-plan/PlanTable';

const PlanPage = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className='w-full'>
        <PlanTable />
      </div>
    );
  }
};

export default PlanPage;
