import { useSelector } from 'react-redux';

import { selectAllDoctors } from '@/redux/slices/doctorSlice';

import { IGetDoctorOptions } from '@/types/user';

export const useDoctorOptions = () => {
  const doctors = useSelector(selectAllDoctors);
  const doctorOptions = doctors.map((doctor: IGetDoctorOptions) => ({
    label: `${doctor.prefix} ${doctor.firstName} ${doctor.lastName}`,
    value: doctor.id,
  }));

  return doctorOptions;
};
