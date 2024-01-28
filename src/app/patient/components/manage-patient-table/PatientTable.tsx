import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import BaseTable from '@/components/table/BaseTable';

import ViewData from '@/app/patient/components/manage-patient-table/ViewData';

const ManagePatientTable = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();

  const [users, setUsers] = useState([]);
  //const users = useSelector(selectAllUsers);
  // console.log('Users:', users);

  const dispatch = useDispatch<any>();

  const loadUsers = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      console.log('data', response.data);

      setUsers(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      // If session exists, load users
      loadUsers();
      //dispatch(fetchUsers());
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
      field: 'id',
      width: 200,
      renderHeader: () => <h5 className='font-bold'>id</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) => `${params.row.id || ''}`,
    },

    {
      field: 'title',
      width: 200,
      renderHeader: () => <h5 className='font-bold'>แผนก</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.title || ''}`,
    },

    {
      field: 'Action',
      width: 150,
      renderHeader: () => <h5 className='font-bold'>กระทำ</h5>,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            <ViewData userId={params.row.id} />
            {/* <EditForm
              loadData={fetchUsers}
              api={`http://localhost:8000/api/user/profile/${params.row.role}/${params.row.id}`}
            />
            <DeleteButton
              loadData={fetchUsers}
              api={`/api/user/profile/${params.row.role}/${params.row.id}`}
            /> */}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <BaseTable rows={users} columns={columns} loading={undefined} />
    </div>
  );
};

export default ManagePatientTable;
