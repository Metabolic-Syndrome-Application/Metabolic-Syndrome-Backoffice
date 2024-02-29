"use client"
import { Box, Collapse, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

import useAxiosAuth from "@/hooks/useAxiosAuth";

import ViewButton from "@/components/buttons/ViewButton";
import BaseTable from "@/components/table/BaseTable";

import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "@/components/buttons/delete-button";
import { fetchAllDailyChallenge, selectAllDailyChallenge } from "@/redux/slices/dailyChallengesSlice";
import ColorButton from "@/components/buttons/ColorButton";
import { getStatusChallengeColor } from "@/helpers/status";
import { API_PATH } from "@/config/api";
import EditDailyChallenge from "@/app/challenge/daily/components/create-daily-challenge/EditDailyChallenge";


const DailyChallengeTable = () => {
  const { data: session } = useSession();

  // API_PATH.GET_QUIZ_ALL
  const dispatch = useDispatch<any>();

  const daily = useSelector(selectAllDailyChallenge);
  console.log('Daily Plan:', daily);


  // width column styles
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



  const loadDailyChallenge = async () => {
    try {
      dispatch(fetchAllDailyChallenge());
      //setUsers(dataAddIndex);
    } catch (error) {
      console.log('error', error);
    }
  };



  useEffect(() => {
    if (session && session.user) {
      // If session exists, load dailys
      loadDailyChallenge()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const columns: GridColDef[] = [
    {
      field: 'index',
      width: isMobile ? 95 : 100,
      renderHeader: () => <h5 className='font-medium'>ลำดับที่</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.index || ''}`,
    },
    {
      field: 'name',
      width: 300,
      renderHeader: () => <h5 className='font-medium'>ชื่อภารกิจ</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.name}`,
    },
    {
      field: 'status',
      width: 150,
      renderHeader: () => <h5 className='font-medium'>ประเภท</h5>,
      renderCell: (params) => {
        const { color, text } = getStatusChallengeColor(params.row.status);
        return (
          <ColorButton variant={color} size='sm'>
            {text}
          </ColorButton>
        );
      },
      valueGetter: (params: GridValueGetterParams) => {
        const { text } = getStatusChallengeColor(params.row.status); // Get the Thai label 
        return text; // Return the Thai label as the field value
      },
    },
    {
      field: 'points',
      width: isMobile ? 150 : 160,
      renderHeader: () => <h5 className='font-medium'>คะแนนรวมสะสม</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.points || ''}`,
    },
    {
      field: 'numDays',
      width: isMobile ? 180 : 190,
      renderHeader: () => <h5 className='font-medium'>ระยะเวลาการทำภารกิจ</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.numDays || ''}`,
    },
    {
      field: 'participants',
      width: isMobile ? 150 : 170,
      renderHeader: () => <h5 className='font-medium'>จำนวนผู้เข้าร่วม</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.participants || ''}`,
    },
    {
      field: 'Action',
      //width: isMobile ? 125 : 150,
      renderHeader: () => <h5 className='font-medium'>จัดการ</h5>,
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            <ViewButton href={`/challenge/daily/detail/${params.row.id}`} />
            {/* <EditDailyChallenge
              loadData={loadDailyChallenge}
      
              id={params.row.id}
             
            /> */}
            <DeleteButton
              loadData={loadDailyChallenge}
              api={API_PATH.DELETE_DAILY_CHALLENGE(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <BaseTable rows={daily} columns={columns} loading={!!daily.length} />
    </div >

  );
}

export default DailyChallengeTable;
