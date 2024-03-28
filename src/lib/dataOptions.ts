import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectAllDoctors } from '@/redux/slices/doctorSlice';
import { selectAllPlans } from '@/redux/slices/plansSlice';

import { IPatientData } from '@/types/patient';
import { IGetDoctorOptions } from '@/types/user';

//Get All Doctor
export const useDoctorOptions = () => {
  const doctors = useSelector(selectAllDoctors);
  const doctorOptions = doctors.map((doctor: IGetDoctorOptions) => ({
    label: `${doctor.prefix} ${doctor.firstName} ${doctor.lastName}`,
    value: doctor.id,
  }));

  return doctorOptions;
};

//Get Status Patient
export const useStatusOptions = () => {
  // Define status options array
  const statusOptions = [
    { label: 'กำลังรักษา', value: 'in process' },
    { label: 'ยกเลิกการรักษา', value: 'rejected' },
    { label: 'รักษาแล้ว', value: 'success' },
  ];

  return statusOptions;
};

export const usePlanOptions = (planID: string[]) => {
  const plans = useSelector(selectAllPlans);

  // Map plans to label and value format
  return plans.map((option) => ({
    label: `${option.name}`,
    value: option.id,
    selected: planID.includes(option.id), // Check if the plan is selected
  }));
};

// map planID
export const useMappedPlanID = (
  patient: IPatientData,
  getPlanOptions: any[]
) => {
  return useMemo(() => {
    if (!patient || !patient.planID) return []; // Handle the case where planID is undefined

    // Map planID to corresponding options with labels and values
    return patient.planID.map((id) => {
      const option = getPlanOptions.find((opt) => opt.value === id);
      return option ? { label: option.label, value: option.value } : undefined;
    });
  }, [patient, getPlanOptions]);
};
