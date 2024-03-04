'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import CardDiseaseRisk from '@/app/patient/components/cards/CardDiseaseRisk';
import { CardInfo } from '@/app/patient/components/cards/CardInfo';
import CardInfoPlan from '@/app/patient/components/cards/CardInfoPlan';
import DoctorEditPatientForm from '@/app/patient/record/personal-info/DoctorEditPatientForm';
import StaffEditPatientForm from '@/app/patient/record/personal-info/StaffEditPatientForm';
import { fetchPatientById, selectPatientById } from '@/redux/slices/patientsSlice';
import { fetchAllPlans } from '@/redux/slices/plansSlice';

const PersonalInfo = ({ id }: { id: string }) => {
  const { data: session } = useSession();

  const axiosAuth = useAxiosAuth()

  const dispatch = useDispatch<any>();

  // const patient = useSelector(selectPatientById)
  const patient = useSelector(selectPatientById);

  console.log('Patient infosss:', patient);

  const loadIdPatient = useCallback(async () => {
    if (id) {
      await dispatch(fetchPatientById(id));
    }
  }, [id, dispatch]);


  useEffect(() => {
    if (session && session.user) {
      // Dispatch actions to fetch patients and doctors
      dispatch(fetchPatientById(id));
      // dispatch(fetchAllDoctors());
      dispatch(fetchAllPlans());
    }
  }, [id, dispatch, session]);




  return (
    <div className=' w-full h-full'>
      {session?.user?.role === 'staff' && (
        <StaffEditPatientForm params={{ id }} loadData={loadIdPatient} />
      )}
      {session?.user?.role === 'doctor' && (
        <DoctorEditPatientForm params={{ id }} loadData={loadIdPatient} />
      )}


      <React.Fragment key={`patient-${patient.id}`}>
        <div className="flex flex-col md:flex-row w-full h-full gap-4">
          {/* Section 1 */}
          <div className="flex flex-col md:w-[65%] gap-4">
            {/* CardInfo */}
            <div >
              {patient && (
                <div key={`patient-info-${patient.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full mb-6 md:mb-0">
                  <CardInfo
                    id={patient?.id}
                    hn={patient?.hn}
                    firstName={patient?.firstName}
                    lastName={patient?.lastName}
                    yearOfBirth={patient?.yearOfBirth}
                    gender={patient?.gender}
                    status={patient?.status}
                    mainDoctor={patient?.mainDoctor}
                    assistanceDoctor={patient?.assistanceDoctor}
                    disease={patient?.disease}
                  />
                </div>
              )}
            </div>

            {/* Render disease risk */}
            {patient && patient.diseaseRisk && (
              <div key={`patient-disease-risk-${patient.id}`}
                className='bg-white shadow-sm border border-gray-100 w-full rounded-2xl p-4'>
                <CardDiseaseRisk
                  id={patient.id}
                  diseaseRisk={patient.diseaseRisk}
                />
              </div>
            )}

          </div>

          {/* Section 2 */}
          {/* Render plan information */}
          <div className="flex flex-col md:w-[35%]">
            {/* Render plan information */}
            {patient && patient.Plan && patient.planID && (
              <div
                key={`patient-plan-${patient.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full h-full"
              >
                <CardInfoPlan planData={{ planID: patient.planID, Plan: patient.Plan }} />
              </div>
            )}
          </div>

        </div>

      </React.Fragment>


    </div>
  );
};

export default PersonalInfo;
