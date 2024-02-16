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

  console.log('Users:', users);

  const dispatch = useDispatch<any>();

  const loadUsers = async () => {
    try {
      dispatch(fetchAllUsers());
      //setUsers(dataAddIndex);
    } catch (error) {
      console.log('error', error);
    }
  };

  // const loadUsers = async () => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await axiosAuth.get<IGetProfileAllApi>(API_PATH.GET_PROFILE_ALL);
  //     //console.log('data', data);
  //     const dataAddIndex = addIndex(data.users);

  //     dispatch(getUsers(dataAddIndex));
  //     //setUsers(dataAddIndex);

  //     console.log('usersWithIndex', dataAddIndex);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  useEffect(() => {
    if (session && session.user) {
      // If session exists, load users
      //loadUsers();
      dispatch(fetchAllUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const columns: GridColDef[] = [
    {
      field: 'index',
      width: 100,
      renderHeader: () => <h5 className='font-bold'>ลำดับที่</h5>,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'name',
      width: 250,
      renderHeader: () => <h5 className='font-bold'>ชื่อ-นามสกุล</h5>,
      headerClassName: 'super-app-theme--header',
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
      field: 'role',
      width: 120,
      renderHeader: () => <h5 className='font-bold'>บทบาท</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        params.row.role === 'doctor' ? 'หมอ' : 'พยาบาล',
    },
    {
      field: 'department',
      width: 200,
      renderHeader: () => <h5 className='font-bold'>แผนก</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.department || ''}`,
    },
    {
      field: 'specialist',
      width: 200,
      renderHeader: () => <h5 className='font-bold'>ความเชี่ยวชาญ</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.specialist || ''}`,
    },
    {
      field: 'gender',
      width: 100,
      renderHeader: () => <h5 className='font-bold'>เพศ</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        params.row.gender === 'male' ? 'ชาย' : 'หญิง',
    },
    {
      field: 'Action',
      width: 150,
      renderHeader: () => <h5 className='font-bold'>กระทำ</h5>,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            {/* <EditForm
              loadData={loadUsers}
              api={`http://localhost:8000/api/user/profile/${params.row.role}/${params.row.id}`}
              id={params.row.id}
            /> */}
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
