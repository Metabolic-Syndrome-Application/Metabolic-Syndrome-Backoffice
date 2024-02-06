'use client';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useEffect } from 'react';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import ViewButton from '@/components/buttons/ViewButton';
import BaseTable from '@/components/table/BaseTable';

import CreatePlan from '@/app/plan/components/manage-plan/CreatePlan';
import { API_PATH } from '@/config/api';

import { IGetPlanAllApi, IPlanData } from '@/types/plan';
import DeleteButton from '@/components/buttons/delete-button';
import OutlineButton from '@/components/buttons/OutlineButton';
import { TypePlan, iconTypeMapping } from '@/helpers/typeIcon';
import { addIndex, addIndexPlan } from '@/components/helpers/number';
import { fetchPlans, selectAllPlans } from '@/redux/slices/plansSlice';
import { useDispatch, useSelector } from 'react-redux';

const PlanTable = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();

  //ตอนยังไม่ได้ทำ redux
  // const [userData, setUserData] = useState<IPlanData[]>([]);

  // const fetchUsers = async () => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await axiosAuth.get<IGetPlanAllApi>(API_PATH.GET_PLAN_ALL);
  //     console.log('Get All plan', data);

  //     const usersWithIndex = addIndexPlan(data.plan);

  //     setUserData(usersWithIndex);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const plan = useSelector(selectAllPlans);

  console.log('Users:', plan);

  const dispatch = useDispatch<any>();

  const loadPlans = async () => {
    try {
      dispatch(fetchPlans());
      //setUsers(dataAddIndex);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      // If session exists, load users
      dispatch(fetchPlans());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const columns: GridColDef[] = [
    {
      field: 'index',
      width: 110,
      renderHeader: () => <h5 className='font-bold'>ลำดับที่</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.index || ''}`,
    },
    {
      field: 'id',
      width: 200,
      renderHeader: () => <h5 className='font-bold'>id</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) => `${params.row.id || ''}`,
    },

    {
      field: 'name',
      width: 250,
      renderHeader: () => <h5 className='font-bold'>ชื่อโปรแกรมสุขภาพ</h5>,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.name || ''}`,
    },
    {
      field: 'type',
      width: 200,
      renderHeader: () => <h5 className='font-bold'>ประเภท</h5>,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        const {
          icon: Icon,
          variant,
          label: thaiLabel,
        } = iconTypeMapping[params.row.type as TypePlan] ||
        iconTypeMapping.default;
        const displayValue = thaiLabel || params.row.type;
        return (
          <OutlineButton variant={variant} icon={Icon}>
            {displayValue}
          </OutlineButton>
        );
      },
      valueGetter: (params: GridValueGetterParams) => `${params.row.type}`,
    },
    {
      field: 'Action',
      width: 150,
      renderHeader: () => <h5 className='font-bold'>กระทำ</h5>,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            <ViewButton href={`/plan/detail/${params.row.id}`} />
            {/* <EditForm
                loadData={fetchUsers}
                api={`http://localhost:8000/api/user/profile/${params.row.role}/${params.row.id}`}
              /> */}
            <DeleteButton
              loadData={loadPlans}
              api={API_PATH.DELETE_PLAN(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <CreatePlan />
      <BaseTable rows={plan} columns={columns} loading={undefined} />
    </div>
  );
};

export default PlanTable;
