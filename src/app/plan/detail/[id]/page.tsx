'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import { CardPlan } from '@/components/common/cards/CardPlan';
import { BackButton } from '@/components/tabbed/BackButton';

import { API_PATH } from '@/config/api';

import { IPlanData } from '@/types/plan';
import EditPlan from '@/app/plan/components/manage-plan/EditPlan';


const ViewPlanPage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  //const [userData, setUserData] = useState<IPlanData[]>([]);
  const [userData, setUserData] = useState<IPlanData | null>(null);
  const id = params.id;

  const fetchPlan = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get(API_PATH.GET_PLAN(id as string));
      console.log('Get 1 plan', data);
      setUserData(data.plan);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }, [axiosAuth, id]); // Add axiosAuth and id as dependencies

  useEffect(() => {
    if (session) {
      fetchPlan();
    }
  }, []);


  return (
    <div>
      <BackButton />


      <div className='shadow-light-shadow bg-white rounded-xl container mx-auto'>

        <EditPlan params={{ id }} loadData={fetchPlan} />

        {userData && (
          <CardPlan
            id={userData.id}
            name={userData.name}
            type={userData.type}
            description={userData.description}
            photo={userData.photo}
            detail={userData.detail}
          />
        )}

      </div>
    </div>
  );
}


export default ViewPlanPage;
