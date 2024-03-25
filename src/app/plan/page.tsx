'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

import PlanTable from '@/app/plan/components/manage-plan/PlanTable';

const PlanPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session && session.user) {
    return (
      <div>
        {/* <TestGeneralForm></TestGeneralForm> */}
        {/* <CreatePlanForm></CreatePlanForm> */}

        {/* < TestCheckbox></TestCheckbox> */}
        <PlanTable></PlanTable>
      </div>
    );
  }
};

export default PlanPage;
