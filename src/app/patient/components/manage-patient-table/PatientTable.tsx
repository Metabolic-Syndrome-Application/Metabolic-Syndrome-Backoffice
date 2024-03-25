/* eslint-disable unused-imports/no-unused-vars */
import {
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import ColorButton from '@/components/buttons/ColorButton';
import DeleteButton from '@/components/buttons/delete-button';
import ViewButton from '@/components/buttons/ViewButton';
import BaseTable from '@/components/table/BaseTable';

import { calculateAgeThaiBuddhist } from '@/helpers/date';
import { getStatusPatientColor } from '@/helpers/status';
import { fetchAllDoctors, selectAllDoctors } from '@/redux/slices/doctorSlice';
import {
  fetchAllPatients,
  selectAllPatients,
} from '@/redux/slices/patientsSlice';

const ManagePatientTable = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();

  const dispatch = useDispatch<any>();

  const patients = useSelector(selectAllPatients);
  // console.log('Patient Tables:', patients);

  const doctors = useSelector(selectAllDoctors);
  //console.log('Doctors:', doctors);

  const loadPatients = async () => {
    try {
      dispatch(fetchAllPatients());
      //setUsers(dataAddIndex);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      // Dispatch actions to fetch patients and doctors
      dispatch(fetchAllPatients());
      dispatch(fetchAllDoctors());
    }
  }, [dispatch, session]);

  const getDoctorById = (doctorId: string) => {
    const doctor = doctors.find(
      (doctor: { id: string }) => doctor.id === doctorId
    );
    return doctor;
  };

  const columns: GridColDef[] = [
    {
      field: 'index',
      width: 100,
      renderHeader: () => <h5 className='font-medium'>ลำดับที่</h5>,
    },
    {
      field: 'hn',
      width: 150,
      renderHeader: () => <h5 className='font-medium'>รหัส HN คนไข้</h5>,
      valueGetter: (params: GridValueGetterParams) => `${params.row.hn || ''}`,
    },
    {
      field: 'name',
      width: 225,
      renderHeader: () => <h5 className='font-medium'>ชื่อ - นามสกุล</h5>,
      renderCell: (params: GridCellParams) => (
        <div>
          <span className='flex'>
            {`${params.row.prefix || ''}${params.row.firstName || ''} ${
              params.row.lastName || ''
            }`}
          </span>
          <span className='text-default-blue '>
            {params.row.username || ''}
          </span>
        </div>
      ),
      valueGetter: (params: GridValueGetterParams) => {
        const prefix = params.row.prefix || '';
        const firstName = params.row.firstName || '';
        const lastName = params.row.lastName || '';
        return `${prefix}${firstName} ${lastName}`.toLowerCase();
      },
    },
    {
      field: 'gender',
      // width: 120,
      renderHeader: () => <h5 className='font-medium'>เพศ</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.gender === 'male' ? 'ชาย' : 'หญิง',
    },
    {
      field: 'yearOfBirth',
      // width: 120,
      renderHeader: () => <h5 className='font-medium'>อายุ</h5>,
      valueGetter: (params: GridValueGetterParams) => {
        const yearOfBirth = params.row.yearOfBirth;
        if (!yearOfBirth) {
          return '-'; // Return '-' if yearOfBirth is null or empty string
        }
        return calculateAgeThaiBuddhist(yearOfBirth);
      },
    },
    {
      field: 'status',
      width: 120,
      renderHeader: () => <h5 className='font-medium'>สถานะ</h5>,
      renderCell: (params) => {
        const { color, text } = getStatusPatientColor(params.row.status);
        return (
          <ColorButton variant={color} size='sm'>
            {text}
          </ColorButton>
        );
      },
      valueGetter: (params: GridValueGetterParams) => {
        const { text } = getStatusPatientColor(params.row.status); // Get the Thai label
        return text; // Return the Thai label as the field value
      },
    },
    // {
    //   field: 'mainDoctorID',
    //   width: 225,
    //   renderHeader: () => <h5 className='font-medium'>แพทย์ผู้รับผิดชอบหลัก</h5>,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.mainDoctorID}`,
    // },
    {
      field: 'mainDoctorID',
      width: 225,
      renderHeader: () => (
        <h5 className='font-medium'>แพทย์ผู้รับผิดชอบหลัก</h5>
      ),
      valueGetter: (params: GridValueGetterParams) => {
        const mainDoctorId = params.row.mainDoctorID;
        const mainDoctor = getDoctorById(mainDoctorId);
        return mainDoctor
          ? `${mainDoctor.prefix}${mainDoctor.firstName} ${mainDoctor.lastName}`
          : '-';
      },
    },
    {
      field: 'Action',
      // width: 150,
      renderHeader: () => <h5 className='font-medium'>จัดการ</h5>,
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            <ViewButton href={`/patient/record/${params.row.id}`} />
            <DeleteButton
              loadData={loadPatients}
              api={`/api/user/profile/patient/${params.row.id}`}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <BaseTable
        rows={patients.patients}
        columns={columns}
        loading={undefined}
      />
    </div>
  );
};

export default ManagePatientTable;
