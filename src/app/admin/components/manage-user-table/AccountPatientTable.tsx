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
import DeleteButton from '@/components/buttons/DeleteButton';
import BaseTable from '@/components/table/BaseTable';

import { API_PATH } from '@/config/api';
import { calculateAgeThaiBuddhist } from '@/helpers/date';
import { getStatusPatientColor } from '@/helpers/status';
import {
  fetchRolePatients,
  selectAllPatients,
} from '@/redux/slices/patientsSlice';

const AccountPatientTable = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();

  const patients = useSelector(selectAllPatients);
  console.log('patients role account', patients);
  const dispatch = useDispatch<any>();

  const loadPatients = async () => {
    try {
      dispatch(fetchRolePatients());
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    if (session) {
      // If session exists, load role patient
      dispatch(fetchRolePatients());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, session]);

  const columns: GridColDef[] = [
    {
      field: 'index',
      width: 100,
      renderHeader: () => <h5 className='font-medium'>ลำดับที่</h5>,
    },
    {
      field: 'id',
      width: 150,
      renderHeader: () => <h5 className='font-medium'>id</h5>,
      renderCell: (params: GridCellParams) => (
        <span style={{ fontSize: '11px' }}>{params.row.id || ''}</span>
      ),
      valueGetter: (params: GridValueGetterParams) => `${params.row.id || '-'}`,
    },
    {
      field: 'hn',
      width: 150,
      renderHeader: () => <h5 className='font-medium'>รหัส HN คนไข้</h5>,
      valueGetter: (params: GridValueGetterParams) => `${params.row.hn || '-'}`,
    },
    {
      field: 'name',
      width: 250,
      renderHeader: () => <h5 className='font-medium'>ชื่อ - นามสกุล</h5>,
      renderCell: (params: GridCellParams) => (
        <span>
          {params.row.firstName || params.row.lastName
            ? `${params.row.firstName || ''} ${params.row.lastName || ''}`
            : '-'}
        </span>
      ),
      valueGetter: (params: GridValueGetterParams) => {
        const fullName = `${params.row.firstName || ''} ${
          params.row.lastName || ''
        }`.toLowerCase();
        return fullName;
      },
    },

    {
      field: 'gender',
      width: 120,
      renderHeader: () => <h5 className='font-medium'>เพศ</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.gender === 'male'
          ? 'ชาย'
          : params.row.gender === 'female'
          ? 'หญิง'
          : '-',
    },
    {
      field: 'yearOfBirth',
      width: 120,
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
    {
      field: 'Action',
      // width: 150,
      renderHeader: () => <h5 className='font-medium'>จัดการ</h5>,
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            <DeleteButton
              loadData={loadPatients}
              api={API_PATH.DELETE_USER('patient', params.row.id)}
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
        loading={!patients.patients.length}
      />
    </div>
  );
};

export default AccountPatientTable;
