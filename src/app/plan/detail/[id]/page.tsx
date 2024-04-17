/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BackButton } from '@/components/tabbed/BackButton';

import { CardPlan } from '@/app/plan/components/cards/CardPlan';
import EditPlan from '@/app/plan/components/create-plan/EditPlan';
import {
  fetchAllPlansDefault,
  fetchPlanById,
  selectPlanById,
} from '@/redux/slices/plansSlice';

const ViewPlanPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { data: session } = useSession();

  const dispatch = useDispatch<any>();
  const plans = useSelector(selectPlanById);

  const loadPlan = useCallback(async () => {
    try {
      await dispatch(fetchPlanById(id));
      await dispatch(fetchAllPlansDefault);
    } catch (error) {
      console.log('loadPlan error', error);
    }
  }, [id]);

  useEffect(() => {
    if (session) {
      dispatch(fetchPlanById(id));
      dispatch(fetchAllPlansDefault);
    }
  }, [session, dispatch]);

  return (
    <div>
      <BackButton />

      <div className='shadow-light-shadow container mx-auto rounded-xl bg-white'>
        <EditPlan params={{ id }} loadData={loadPlan} />

        {plans && (
          <CardPlan
            id={plans?.id}
            name={plans?.name}
            type={plans?.type}
            description={plans?.description}
            photo={plans?.photo}
            detail={plans?.detail}
          />
        )}
      </div>
    </div>
  );
};

export default ViewPlanPage;
