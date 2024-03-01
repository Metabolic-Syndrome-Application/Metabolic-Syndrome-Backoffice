'use client';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import DeleteButton from '@/components/buttons/delete-button';
import OutlineButton from '@/components/buttons/OutlineButton';
import ViewButton from '@/components/buttons/ViewButton';
import BaseTable from '@/components/table/BaseTable';

import TestSendForm from '@/app/plan/components/create-plan/nested-form/TestSendForm';
import { API_PATH } from '@/config/api';
import { iconTypeMapping, TypePlan } from '@/helpers/typeIcon';
import { fetchAllPlans, selectAllPlans } from '@/redux/slices/plansSlice';

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

  console.log('Plans:', plan);

  const dispatch = useDispatch<any>();

  const loadPlans = async () => {
    try {
      dispatch(fetchAllPlans());
      //setUsers(dataAddIndex);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      // If session exists, load users
      loadPlans()
    }
    // eslint-dis able-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'index',
      width: 150,
      renderHeader: () => <h5 className='font-medium'>ลำดับที่</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.index || ''}`,
    },
    {
      field: 'name',
      width: 450,
      renderHeader: () => <h5 className='font-medium'>ชื่อโปรแกรมสุขภาพ</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.name || ''}`,
    },
    {
      field: 'type',
      width: 300,
      renderHeader: () => <h5 className='font-medium'>ประเภท</h5>,
      renderCell: (params) => {
        const getTypeLabel = (type: string) => {
          const {
            icon: Icon,
            variant,
            label: thaiLabel,
          } = iconTypeMapping[type as TypePlan] || iconTypeMapping.default;
          return (
            <OutlineButton variant={variant} icon={Icon}>
              {thaiLabel || type}
            </OutlineButton>
          );
        };
        return getTypeLabel(params.row.type);
      },
      valueGetter: (params: GridValueGetterParams) => {
        const getTypeLabel = (type: string) =>
          iconTypeMapping[type as TypePlan]?.label || type;
        return getTypeLabel(params.row.type); //find thai type word
      },
    },
    {
      field: 'Action',
      width: 200,
      renderHeader: () => <h5 className='font-medium'>จัดการ</h5>,
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            <ViewButton href={`/plan/detail/${params.row.id}`} />
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
      {/* <CreatePlan /> */}
      <TestSendForm />
      <BaseTable rows={plan} columns={columns} loading={!!plan.length} />
    </div>
  );
};

export default PlanTable;
