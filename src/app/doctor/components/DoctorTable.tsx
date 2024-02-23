import { capitalize } from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import DeleteButton from '@/components/buttons/delete-button';
import { addIndexUser } from '@/helpers/number';
import BaseTable from '@/components/table/BaseTable';

import { API_PATH } from '@/config/api';

import { IGetProfileAllApi, IUserData } from '@/types/user';

const DoctorTable = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();

  const [users, setUsers] = useState<IUserData[]>([]);

  const loadUsers = async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetProfileAllApi>(API_PATH.GET_PROFILE_ALL);
      console.log('data', data);
      const dataAddIndex = addIndexUser(data.users);

      setUsers(dataAddIndex);
      console.log('usersWithIndex', dataAddIndex);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (session) {
      // If session exists, load users
      loadUsers();
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
      field: 'Username',
      width: 150,
      renderHeader: () => <h5 className='font-bold'>ชื่อผู้ใช้</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        `${capitalize(params.row.username || '')}`,
    },
    {
      field: 'firstName',
      width: 250,
      renderHeader: () => <h5 className='font-bold'>ชื่อ-นามสกุล</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        `${capitalize(params.row.firstName || '')} ${capitalize(
          params.row.lastName || ''
        )} `,
    },
    {
      field: 'role',
      width: 120,
      renderHeader: () => <h5 className='font-bold'>บทบาท</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        `${capitalize(params.row.role || '')}`,
    },
    {
      field: 'department',
      width: 200,
      renderHeader: () => <h5 className='font-bold'>แผนก</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        `${capitalize(params.row.department || '')}`,
    },
    {
      field: 'specialist',
      width: 200,
      renderHeader: () => <h5 className='font-bold'>ความเชี่ยวชาญ</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        `${capitalize(params.row.specialist || '')}`,
    },
    {
      field: 'Action',
      width: 150,
      renderHeader: () => <h5 className='font-bold'>จัดการ</h5>,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            {/* <EditMemberForm id={params.row._id} /> */}
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
    <div className='w-full md:max-w-[1200px]'>
      <BaseTable rows={users} columns={columns} loading={undefined} />
    </div>
  );
};

export default DoctorTable;
