'use client';

import { getGridDateOperators, GridColDef, GridColumnGroupingModel, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import OutlineButton from '@/components/buttons/OutlineButton';
import BaseTable from '@/components/table/BaseTable';

import { convertDateFormat } from '@/helpers/date';
import { getRecordBy } from '@/helpers/status';
import { selectAllrecords } from '@/redux/slices/recordHealthsSlice';

const RecordHealthTable = ({ params, fetchRecordApi }: { params: { id: string }, fetchRecordApi: (id: string) => void }) => {
  const { data: session } = useSession();

  const axiosAuth = useAxiosAuth()

  const id = params.id;


  const record = useSelector(selectAllrecords);

  const dispatch = useDispatch<any>();

  const loadRecords = useCallback(async () => {
    try {
      //dispatch(fetchRecordAllById(id));
      fetchRecordApi(id);

    } catch (error) {
      console.log('error', error);
    }
  }, [id])

  // useEffect(() => {
  //   if (session) {
  //     //fetchUser();
  //     loadRecords()
  //     // dispatch(fetchRecordById(id));
  //   }
  // }, []);

  useEffect(() => {
    if (session) {
      loadRecords();
    }
  }, []);


  //ก่อนใช้ redux fetch all record health
  // const [userData, setUserData] = useState<IRecordHealthData[]>([]);

  // const fetchUser = useCallback(async () => {
  //   try {
  //     const {
  //       data: { data },
  //     } = await axiosAuth.get(
  //       API_PATH.GET_RECORD_HEALTH_BY_ALL(id));
  //     console.log('Get record health all', data);

  //     const usersWithIndex = addIndexRecord(data.record);
  //     setUserData(usersWithIndex);
  //   } catch (error) {
  //     console.log('Error fetching user data:', error);
  //   }
  // }, [axiosAuth, id]);

  //date filter 
  const dateOperators = getGridDateOperators();

  //rendercell color styles base on recordBy
  const renderCellWithColor = (params: GridRenderCellParams, field: string | ((params: GridRenderCellParams) => any)) => {
    const { color: recordByColor } = getRecordBy(params.row.recordBy);
    let value;

    // Check field is string or a function
    if (typeof field === 'string') {
      value = params.row[field]; //Bracket notation to access the property of an object dynamically.
    } else {
      // If field is a function, call it passing params
      value = field(params);
    }

    // Check if the value is undefined, null, or an empty string
    if (value === undefined || value === null || value === '') {
      return null;
    }

    return (
      <div style={{ color: recordByColor, textAlign: 'center' }}>{value}</div>
    );
  };

  //render header unit cell
  const renderHeaderCell = (title: string, unit: string) => (
    <div className='text-center'>
      <h5 className='font-medium'>{title}</h5>
      {unit && <h5 className='font-medium text-default-gray'>({unit})</h5>}
    </div>
  );


  const columns: GridColDef[] = [
    {
      field: 'index',
      renderHeader: () => <h5 className='font-medium'>ลำดับที่</h5>,
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'id'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.id || ''}`,
    },
    {
      field: 'timestamp',
      width: 200,
      renderHeader: () => <h5 className='font-medium'>วันและเวลาที่บันทึก</h5>,
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, (params) => convertDateFormat(params.row.timestamp)),
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.timestamp;
      },
      filterOperators: dateOperators,
    },
    {
      field: 'bmi',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => <h5 className='font-medium'>BMI</h5>,
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'bmi'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.bmi || ''}`,
    },
    {
      field: 'waistline',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => <h5 className='font-medium'>รอบเอว</h5>,
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'waistline'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.waistline || ''}`,
    },
    {
      field: 'systolicBloodPressure',
      headerName: 'Systolic',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => renderHeaderCell('Systolic', 'mmHg'),
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'systolicBloodPressure'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.systolicBloodPressure || ''}`,
    },

    {
      field: 'diastolicBloodPressure',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => renderHeaderCell('Diastolic', 'mmHg'),
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'diastolicBloodPressure'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.diastolicBloodPressure || ''}`,
    },
    {
      field: 'pulseRate',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => renderHeaderCell('Pulse Rate', 'ครั้ง/นาที'),
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'pulseRate'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.pulseRate || ''}`,
    },
    {
      field: 'bloodGlucose',
      width: 140,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => renderHeaderCell('Hyperglycemia', 'mg/dL'),
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'bloodGlucose'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.bloodGlucose || ''}`,
    },
    {
      field: 'cholesterol',
      width: 140,
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => renderHeaderCell('Total Cholesterol', 'mg/dL'),
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'cholesterol'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.cholesterol || ''}`,
    },
    {
      field: 'hdl',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => renderHeaderCell('HDL', 'mg/dL'),
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'hdl'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.hdl || ''}`,
    },
    {
      field: 'ldl',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => renderHeaderCell('LDL', 'mg/dL'),
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'ldl'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.ldl || ''}`,
    },
    {
      field: 'triglyceride',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => renderHeaderCell('TG', 'mg/dL'),
      renderCell: (params: GridRenderCellParams) => renderCellWithColor(params, 'triglyceride'),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.triglyceride || ''}`,
    },
    {
      field: 'recordBy',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => <h5 className='font-medium'>บันทึกโดย</h5>,
      renderCell: (params) => {
        const { color, text } = getRecordBy(params.row.recordBy);
        return (
          <OutlineButton variant={color} size='sm'>
            {text}
          </OutlineButton>
        );
      },
      valueGetter: (params: GridValueGetterParams) => {
        const { text } = getRecordBy(params.row.recordBy); // Get the Thai label directly from getRecordBy function
        return text;
      },

    },


  ];

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: 'id',
      children: [{ field: 'id' }],
    },

    {
      groupId: 'ค่าดัชนีมวลกาย',
      headerAlign: 'center',
      children: [{ field: 'bmi' }, { field: 'waistline' }],
      headerClassName: 'super-app-theme--header',
    },
    {
      groupId: 'ความดัน',
      headerAlign: 'center',
      children: [{ field: 'systolicBloodPressure' }, { field: 'diastolicBloodPressure' }, { field: 'pulseRate' }],
    },
    {
      groupId: 'ระดับน้ำตาลในเลือด',
      headerAlign: 'center',
      children: [{ field: 'bloodGlucose' }],
    },
    {
      groupId: 'ระดับไขมันในเลือด',
      headerAlign: 'center',
      children: [{ field: 'cholesterol' }, { field: 'hdl' }, { field: 'ldl' }, { field: 'triglyceride' }],
    },
  ];

  return (
    <div className='w-full md:max-w-screen-lg lg:max-w-full 2xl:max-w-full'>
      <BaseTable
        rows={record}
        columns={columns}
        loading={!!record.length}
        columnGroupingModel={columnGroupingModel}
      />

    </div>


  )
}

export default RecordHealthTable