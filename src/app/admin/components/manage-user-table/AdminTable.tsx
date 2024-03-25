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

import DeleteButton from '@/components/buttons/delete-button';
import BaseTable from '@/components/table/BaseTable';

import AdminEditProfile from '@/app/admin/components/AdminEditProfile';
import { API_PATH } from '@/config/api';
import { fetchAllUsers, selectAllUsers } from '@/redux/slices/usersSlice';

const ManageUserTable = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();

  //const [users, setUsers] = useState<IUserData[]>([]);
  const users = useSelector(selectAllUsers);

  // console.log('Users:', users);

  const dispatch = useDispatch<any>();

  const loadUsers = async () => {
    try {
      dispatch(fetchAllUsers());
      //setUsers(dataAddIndex);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      // If session exists, load users

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
      field: 'name',
      width: 250,
      renderHeader: () => <h5 className='font-medium'>ชื่อ-นามสกุล</h5>,
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
      field: 'role',
      width: 120,
      renderHeader: () => <h5 className='font-medium'>บทบาท</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.role === 'doctor' ? 'หมอ' : 'พยาบาล',
    },
    {
      field: 'department',
      width: 200,
      renderHeader: () => <h5 className='font-medium'>แผนก</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.department || ''}`,
    },
    {
      field: 'specialist',
      width: 200,
      renderHeader: () => <h5 className='font-medium'>ความเชี่ยวชาญ</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.specialist || ''}`,
    },
    {
      field: 'gender',
      width: 100,
      renderHeader: () => <h5 className='font-medium'>เพศ</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.gender === 'male' ? 'ชาย' : 'หญิง',
    },
    {
      field: 'Action',
      width: 150,
      renderHeader: () => <h5 className='font-medium'>จัดการ</h5>,
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            <AdminEditProfile
              loadData={loadUsers}
              api={API_PATH.PUT_PROFILE_OTHER(params.row.role, params.row.id)}
              id={params.row.id}
            />
            <DeleteButton
              loadData={loadUsers}
              api={API_PATH.DELETE_USER(params.row.role, params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <BaseTable rows={users} columns={columns} loading={!users.length} />
    </div>
  );
};

export default ManageUserTable;
