import { GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import ColorButton from '@/components/buttons/ColorButton';
import ViewButton from '@/components/buttons/ViewButton';
import BaseTable from '@/components/table/BaseTable';

import { getStatusPatientColor } from '@/helpers/status';
import { fetchAllUsers, getUsers, selectAllUsers } from '@/redux/slices/usersSlice';
import { IGetProfileAllApi } from '@/types/user';
import { addIndexUser } from '@/helpers/number';
import { API_PATH } from '@/config/api';
import DeleteButton from '@/components/buttons/delete-button';

const ManagePatientTable = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();

  const users = useSelector(selectAllUsers);
  console.log('Patients:', users);

  const dispatch = useDispatch<any>();

  // const [users, setUsers] = useState([]);
  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://jsonplaceholder.typicode.com/posts'
  //     );
  //     console.log('data', response.data);

  //     setUsers(response.data);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
  const loadUsers = async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetProfileAllApi>(API_PATH.GET_PROFILE_ALL);
      //console.log('data', data);
      const dataAddIndex = addIndexUser(data.users);

      dispatch(getUsers(dataAddIndex));
      //setUsers(dataAddIndex);

      console.log('usersWithIndex', dataAddIndex);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      // If session exists, load users
      //fetchUsers();
      dispatch(fetchAllUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
            {`${params.row.prefix || ''}${params.row.firstName || ''} ${params.row.lastName || ''
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
      valueGetter: (params: GridValueGetterParams) => `${params.row.gender || ''}`,
    },
    {
      field: 'yearOfBirth',
      // width: 120,
      renderHeader: () => <h5 className='font-medium'>อายุ</h5>,
      valueGetter: (params: GridValueGetterParams) => `${params.row.yearOfBirth || ''}`,
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
      field: 'mainDoctorID',
      width: 225,
      renderHeader: () => <h5 className='font-medium'>แพทย์ผู้รับผิดชอบหลัก</h5>,
      valueGetter: (params: GridValueGetterParams) => `${'นายสมศักดิ์ คำดี'}`, //params.row.mainDoctorID || ''
    },
    {
      field: 'Action',
      // width: 150,
      renderHeader: () => <h5 className='font-medium'>จัดการ</h5>,
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            <ViewButton href={`/patient/record/${params.row.id}`} />
            {/* <EditForm
              loadData={loadUsers}
              api={`http://localhost:8000/api/user/profile/${params.row.role}/${params.row.id}`}
            /> */}
            <DeleteButton
              loadData={loadUsers}
              api={`/api/user/profile/${params.row.role}/${params.row.id}`}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {/* !user.lenght */}
      <BaseTable rows={users} columns={columns} loading={!!users.length} />
    </div>
  );
};

export default ManagePatientTable;


