'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BackButton } from '@/components/tabbed/BackButton';

import { CardPlan } from '@/app/plan/components/cards/CardPlan';
import EditPlan from '@/app/plan/components/manage-plan/EditPlan';
import { fetchPlanById, selectPlanById } from '@/redux/slices/plansSlice';



const ViewPlanPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { data: session } = useSession();

  //not used redux
  // const [userData, setUserData] = useState<IPlanData | null>(null);
  // const fetchPlan = useCallback(async () => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await axiosAuth.get(API_PATH.GET_PLAN(id as string));
  //     console.log('Get 1 plan', data);
  //     setUserData(data.plan);
  //   } catch (error) {
  //     console.log('Error fetching user data:', error);
  //   }
  // }, [axiosAuth, id]); 

  const dispatch = useDispatch<any>();
  const plans = useSelector(selectPlanById);


  const loadPlan = useCallback(async () => {
    try {
      dispatch(fetchPlanById(id));
      //console.log('fetchPlanById', loadPlan)
    } catch (error) {
      //console.log('error', error);
    }
  }, [id])


  useEffect(() => {
    if (session) {
      dispatch(fetchPlanById(id));
    }
  }, []);


  return (
    <div>
      <BackButton />

      <div className='shadow-light-shadow bg-white rounded-xl container mx-auto'>

        <EditPlan params={{ id }} loadData={loadPlan} />
        {/* wait refresh page */}
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
}


export default ViewPlanPage;
