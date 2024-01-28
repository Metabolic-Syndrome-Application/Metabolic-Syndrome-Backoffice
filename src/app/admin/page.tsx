'use client';
import React, { useEffect, useRef } from 'react';

import useModal from '@/hooks/useModal';

import Test from '@/app/admin/components/AddForm';

import ManageUserTable from '@/app/admin/components/manage-user-table';
import EditForm from '@/app/admin/components/EditForm';
import { axiosAuth } from '@/lib/axios';
import { IGetProfileAllApi } from '@/types/profile';
import { addIndex } from '@/components/helpers/number';
import { useDispatch, useSelector } from 'react-redux';

import { API_PATH } from '@/config/api';
import AddForm from '@/app/admin/components/AddForm';
import { fetchUsers } from '@/redux/slices/usersSlice';

const AdminPage = () => {
  const { Modal, openModal, closeModal } = useModal();
  // const users = useSelector(selectUsers);

  //const dispatch = useDispatch<any>();

  // const loadUsers = async () => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await axiosAuth.get<IGetProfileAllApi>(API_PATH.GET_PROFILE_ALL);

  //     const dataAddIndex = addIndex(data.users);
  //     dispatch(setUsers(dataAddIndex));

  //     console.log('usersWithIndex', dataAddIndex);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  return (
    <div className='w-full'>
      {/* <TextButton>hey</TextButton>
      <Button leftIcon={FiPlusCircle}>hh</Button> */}
      {/* <button onClick={() => setIsOpen(true)}>Open Modal</button> */}
      <AddForm />

      <ManageUserTable />
      {/* <TestCreatePatient /> */}
    </div>
  );
};

export default AdminPage;
