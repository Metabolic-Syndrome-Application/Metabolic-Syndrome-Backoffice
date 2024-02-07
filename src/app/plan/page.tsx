'use client';
import CreatePlanForm from '@/app/plan/components/create-plan';
import TestGeneralForm from '@/app/plan/components/create-plan/TestGeneralForm';
import PlanTable from '@/app/plan/components/manage-plan/PlanTable';
import { useSession } from 'next-auth/react';
import React from 'react';

const PlanPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session && session.user) {
    return (
      <div>
        <p>test</p>
        <TestGeneralForm></TestGeneralForm>
        <CreatePlanForm></CreatePlanForm>
        <PlanTable></PlanTable>
      </div>
    );
  }
};

export default PlanPage;
