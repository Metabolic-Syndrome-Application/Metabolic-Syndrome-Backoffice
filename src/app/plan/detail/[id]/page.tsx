'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import { CardPlan } from '@/components/common/cards/CardPlan';
import { BackButton } from '@/components/tabbed/BackButton';

import EditPlan from '@/app/plan/components/manage-plan/EditPlan';
import { API_PATH } from '@/config/api';

import { IPlanData } from '@/types/plan';

const ViewPlanPage = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  //const [userData, setUserData] = useState<IPlanData[]>([]);
  const [userData, setUserData] = useState<IPlanData | null>(null);

  const id = params.id;

  const fetchUser = async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get(API_PATH.GET_PLAN(id as string));
      //console.log('Get 1 plan', data);
      setUserData(data.plan);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [axiosAuth, id]);

  if (session && session.user) {
    return (
      <div>
        <BackButton />


        <div className='shadow-light-shadow rounded-xl container mx-auto'>

          <EditPlan params={{ id }} loadData={fetchUser} />

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
          {/* <button onClick={fetchUser} className='bg-blue-50'>
            Get all user
          </button>
          <button onClick={() => setUserData(null)} className='bg-blue-50'>
            Clear Users
          </button>
          {userData && JSON.stringify(userData)} */}
        </div>
      </div>
    );
  }
};

export default ViewPlanPage;
