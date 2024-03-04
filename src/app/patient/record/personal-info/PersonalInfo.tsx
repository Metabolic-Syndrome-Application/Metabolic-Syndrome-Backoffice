'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import FormHeaderText from '@/components/form/FormHeaderText';

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
    try {
      dispatch(fetchPatientById(id));
    } catch (error) {
      console.log('error', error);
    }
  }, [dispatch, id])


  useEffect(() => {
    if (session && session.user) {
      // Dispatch actions to fetch patients and doctors
      dispatch(fetchPatientById(id));
      // dispatch(fetchAllDoctors());
      dispatch(fetchAllPlans())
    }
  }, [dispatch]);




  return (
    <div className='w-full'>
      {session?.user?.role === 'staff' && (
        <StaffEditPatientForm params={{ id }} loadData={loadIdPatient} />
      )}
      {session?.user?.role === 'doctor' && (
        <DoctorEditPatientForm params={{ id }} loadData={loadIdPatient} />
      )}
      {/* 
      {patient && (
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

      )}
      {patient && patient.diseaseRisk && (
        <CardDiseaseRisk
          id={patient.id}
          diseaseRisk={patient.diseaseRisk} />
      )}


      {patient && patient.Plan && patient.planID && (
        <div>
          <CardInfoPlan id={patient?.id} planData={{ planID: patient.planID, Plan: patient.Plan }} />
        </div>
      )}
   */}
      <React.Fragment key={`patient-${patient.id}`}>
        {/* Render patient information */}
        {patient && (
          <div key={`patient-info-${patient.id}`}>
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

        {/* Render disease risk */}
        {patient && patient.diseaseRisk && (
          <div key={`patient-disease-risk-${patient.id}`}>
            <CardDiseaseRisk
              id={patient.id}
              diseaseRisk={patient.diseaseRisk}
            />
          </div>
        )}

        {/* Render plan information */}
        {patient && patient.Plan && patient.planID && (
          <div key={`patient-plan-${patient.id}`}>
            <CardInfoPlan planData={{ planID: patient.planID, Plan: patient.Plan }} />
          </div>
        )}
      </React.Fragment>

      <FormHeaderText title='การเพิ่มสิทธิ์ให้แพทย์' useBigestHeader={false} />
      <FormHeaderText title='การปรับเปลี่ยนพฤติกรรม' useBigestHeader={false} />
    </div>
  );
};

export default PersonalInfo;
