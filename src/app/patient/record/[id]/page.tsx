'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BackButton } from '@/components/tabbed/BackButton';

import { MainPatientTabs } from '@/app/patient/components/tabs';
import { getNamePatient } from '@/constant/user';
import {
  fetchPatientById,
  selectPatientById,
} from '@/redux/slices/patientsSlice';

const RecordPage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();

  const id = params.id;

  const dispatch = useDispatch<any>();

  const patient = useSelector(selectPatientById);
  const profile = getNamePatient(patient);

  useEffect(() => {
    if (session && session.user) {
      // Dispatch actions to fetch patient
      dispatch(fetchPatientById(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-col p-4'>
        <div className='flex'>
          <BackButton />
          <h3 className='text-balance text-black'>
            สมุดบันทึกคนไข้ของ{profile}
          </h3>
        </div>
        <div className='text-light-gray flex w-full border-b-[1.5px] pb-2 pt-1'></div>
      </div>

      <MainPatientTabs params={params} />
    </div>
  );
};

export default RecordPage;
