'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import { BackButton } from '@/components/tabbed/BackButton';

import { MainPatientTabs } from '@/app/patient/components/tabs';
import { fetchPatientById, selectPatientById } from '@/redux/slices/patientsSlice';

const RecordPage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();

  const axiosAuth = useAxiosAuth()

  const id = params.id;

  // const [userData, setUserData] = useState(null);
  // const fetchUser = useCallback(async () => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await axiosAuth.get(
  //       API_PATH.GET_PROFILE_OTHER(id));
  //     console.log('Get 1 patient', data);
  //     setUserData(data.user);
  //   } catch (error) {
  //     console.log('Error fetching user data:', error);
  //   }
  // }, [axiosAuth, id]); // Add axiosAuth and id as dependencies

  // useEffect(() => {
  //   if (session) {
  //     fetchUser();
  //   }
  // }, []);

  const dispatch = useDispatch<any>();

  const patient = useSelector(selectPatientById);


  useEffect(() => {
    if (session && session.user) {
      // Dispatch actions to fetch patient
      dispatch(fetchPatientById(id));
    }
  }, []);


  return (
    <div>
      <div className='flex'>
        <BackButton />
        <h1>สมุดบันทึกคนไข้</h1>
      </div>

      <MainPatientTabs id={id} />




    </div>
  );
};

export default RecordPage;
