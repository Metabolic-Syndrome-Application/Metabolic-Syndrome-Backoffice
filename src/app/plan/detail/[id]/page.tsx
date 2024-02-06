'use client';
import { CardPlan } from '@/components/common/cards/CardPlan';
import { BackButton } from '@/components/tabbed/BackButton';
import Tiptap from '@/components/text-editor/Tiptap';
import { API_PATH } from '@/config/api';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { IGetPlanAllApi, IPlanData } from '@/types/plan';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

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
      console.log('Get 1 plan', data);
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
        <BackButton></BackButton>
        ViewPlanPage
        <div>
          {userData && (
            <CardPlan
              id={userData.id}
              name={userData.name}
              type={userData.type}
              description={userData.description}
              photo={userData.photo}
            />
          )}
          <button onClick={fetchUser} className='bg-blue-50'>
            Get all user
          </button>
          <button onClick={() => setUserData(null)} className='bg-blue-50'>
            Clear Users
          </button>
          {/* <div>
            {userData && (
              <Tiptap
                description={userData.description}
                onChange={(richText) => console.log(richText)}
              />
            )}
          </div> */}
          {userData && JSON.stringify(userData)}
        </div>
      </div>
    );
  }
};

export default ViewPlanPage;
