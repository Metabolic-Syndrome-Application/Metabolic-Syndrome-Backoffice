/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardDiseaseRisk from '@/app/patient/components/cards/CardDiseaseRisk';
import { CardInfo } from '@/app/patient/components/cards/CardInfo';
import CardInfoPlan from '@/app/patient/components/cards/CardInfoPlan';
import DoctorEditPatientForm from '@/app/patient/record/personal-info/DoctorEditPatientForm';
import StaffEditPatientForm from '@/app/patient/record/personal-info/StaffEditPatientForm';
import {
  fetchPatientById,
  selectPatientById,
} from '@/redux/slices/patientsSlice';
import { fetchAllPlansDefault } from '@/redux/slices/plansSlice';

type PageProps = {
  params: {
    id: string;
  };
};

const PersonalInfo: React.FC<PageProps> = ({ params }) => {
  const { data: session } = useSession();

  const dispatch = useDispatch<any>();

  const patient = useSelector(selectPatientById);
  //console.log('Patient infosss:', patient);

  const loadIdPatient = useCallback(async () => {
    if (params.id) {
      await dispatch(fetchPatientById(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (session && session.user) {
      // Dispatch actions to fetch patients and doctors
      dispatch(fetchPatientById(params.id));
      dispatch(fetchAllPlansDefault());
    }
  }, [dispatch, session]);

  return (
    <div className=' h-full w-full'>
      {session?.user?.role === 'staff' && (
        <StaffEditPatientForm params={params} loadData={loadIdPatient} />
      )}
      {session?.user?.role === 'doctor' && (
        <DoctorEditPatientForm params={params} loadData={loadIdPatient} />
      )}

      <React.Fragment key={`patient-${patient.id}`}>
        <div className='flex h-full w-full flex-col gap-4 md:flex-row'>
          {/* Section 1 */}
          <div className='flex flex-col gap-4 md:w-[65%]'>
            {/* CardInfo */}
            <div>
              {patient && (
                <div
                  key={`patient-info-${patient.id}`}
                  className='mb-6 w-full rounded-2xl border border-gray-100 bg-white shadow-sm md:mb-0'
                >
                  <CardInfo
                    id={patient?.id}
                    hn={patient?.hn}
                    firstName={patient?.firstName}
                    lastName={patient?.lastName}
                    yearOfBirth={patient?.yearOfBirth}
                    gender={patient?.gender}
                    status={patient?.status}
                    mainDoctorID={patient?.mainDoctorID}
                    mainDoctor={patient?.mainDoctor}
                    assistanceDoctorID={patient?.assistanceDoctorID}
                    assistanceDoctor={patient?.assistanceDoctor}
                    disease={patient?.disease}
                  />
                </div>
              )}
            </div>

            {/* Render disease risk */}
            {patient && patient.diseaseRisk && (
              <div
                key={`patient-disease-risk-${patient.id}`}
                className='w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'
              >
                <CardDiseaseRisk
                  id={patient.id}
                  diseaseRisk={patient.diseaseRisk}
                />
              </div>
            )}
          </div>

          {/* Section 2 */}
          {/* Render plan information */}
          <div className='flex flex-col md:w-[35%]'>
            {patient && patient.Plan && patient.planID && (
              <div
                key={`patient-plan-${patient.id}`}
                className='h-full w-full rounded-2xl border border-gray-100 bg-white shadow-sm'
              >
                <CardInfoPlan
                  planData={{ planID: patient.planID, Plan: patient.Plan }}
                />
              </div>
            )}
            {/* Display "Not have plan" */}
            {patient && patient.Plan && !patient.planID && (
              <div className='h-full w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
                <h4 className='text-balance p-2'>โปรแกรมสุขภาพ</h4>
                <div className='flex flex-col items-center justify-center'>
                  <Image
                    src='/assets/images/noData.svg'
                    alt='noData'
                    className='h-56 w-56'
                    width={350}
                    height={350}
                    priority={false}
                  />
                  <p className='text-default-red'>ยังไม่มีแผนสุขภาพในตอนนี้</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default PersonalInfo;
