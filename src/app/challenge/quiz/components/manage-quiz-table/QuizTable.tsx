/* eslint-disable unused-imports/no-unused-vars */
'use client';
import {
  Box,
  Collapse,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import DeleteButton from '@/components/buttons/DeleteButton';
import ViewButton from '@/components/buttons/ViewButton';
import BaseTable from '@/components/table/BaseTable';

import { API_PATH } from '@/config/api';
import { fetchAllQuizs, selectAllQuizs } from '@/redux/slices/quizsSlice';

import { IChoicesQuiz, IQuizChallengeData } from '@/types/challenge';

const detailExpandStyles = {
  mt: 1,
  pt: 1,
  borderTop: '1px solid #C9E1FD',
};

const QuizTable = () => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const enqueueSnackbar = useSnackbar();

  // API_PATH.GET_QUIZ_ALL
  const [quizData, setQuizData] = useState<IQuizChallengeData[]>([]);

  // API_PATH.GET_QUIZ (ID)
  const [expandedQuiz, setExpandedQuiz] = useState<IQuizChallengeData | null>(
    null
  );
  const [clickedIndex, setClickedIndex] = useState<string | null>(null);

  // width column styles
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const quiz = useSelector(selectAllQuizs);
  //console.log('quiz:', quiz);

  const dispatch = useDispatch<any>();

  const loadQuizAll = async () => {
    try {
      dispatch(fetchAllQuizs());
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchQuiz = useCallback(
    async (id: string) => {
      try {
        const {
          data: { data },
        } = await axiosAuth.get(API_PATH.GET_QUIZ(id));
        setExpandedQuiz(data.quiz);
        console.log('fetchQuiz id', data.quiz);
      } catch (error) {
        console.log('Error fetching quiz data:', error);
      }
    },
    [axiosAuth]
  );

  //handle Row Expand Toggle
  const handleRowExpandToggle = (rowId: string) => {
    if (clickedIndex === rowId) {
      setClickedIndex(null); // Collapse the currently expanded row if clicked again
      setExpandedQuiz(null); // Reset expandedQuiz when collapsing the row
    } else {
      setClickedIndex(rowId); // Expand the clicked row
      fetchQuiz(rowId); // Fetch the quiz data for the clicked row
    }
  };

  useEffect(() => {
    if (session && session.user) {
      // If session exists, load users
      loadQuizAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'id',
      width: 40,
      renderHeader: () => <h5 className='font-medium'></h5>,
      // renderCell: (cellValues: GridRenderCellParams) => (
      //   <IconButton onClick={() => { clickedIndex === cellValues.value ? setClickedIndex(-1) : setClickedIndex(cellValues.value) }}>
      //     {cellValues.value === clickedIndex ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      //   </IconButton>
      // ),
      renderCell: (cellValues: GridRenderCellParams) => (
        <div className='flex items-center justify-center'>
          <IconButton onClick={() => handleRowExpandToggle(cellValues.row.id)}>
            {clickedIndex === cellValues.row.id ? (
              <IoIosArrowUp className='h-4 w-4 text-gray-400' />
            ) : (
              <IoIosArrowUp className='h-4 w-4 rotate-180 text-gray-400' />
            )}
          </IconButton>
        </div>
      ),
      valueGetter: (params: GridValueGetterParams) => `${params.row.id || ''}`,
    },
    {
      field: 'index',
      width: isMobile ? 125 : 150,
      renderHeader: () => <h5 className='font-medium'>ลำดับที่</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.index || ''}`,
    },
    {
      field: 'question',
      width: isMobile ? 250 : 400,
      renderHeader: () => <h5 className='font-medium'>ชื่อคำถาม</h5>,
      renderCell: (cellValues: GridRenderCellParams) => (
        <div>
          {/* params.row.question */}
          <div className='flex w-[250px] break-all pr-4 md:w-[400px]'>
            {cellValues.value}
          </div>
          {/* expand row : see question & correct chouce */}
          <Collapse in={expandedQuiz?.id === cellValues.row.id}>
            <Box component='section' sx={detailExpandStyles}>
              <span className='break-all'>คำถาม : {cellValues.value}</span>
              <br />
              <span className='break-all text-[#186EC8]'>
                คำตอบ :{' '}
                {expandedQuiz && expandedQuiz.choices
                  ? expandedQuiz.choices
                      .filter((choice: IChoicesQuiz) => choice.isCorrect) // Filter choices with isCorrect true
                      .map((choice: IChoicesQuiz) => choice.option)
                  : 'ไม่มีข้อถูก'}
              </span>
            </Box>
          </Collapse>
        </div>
      ),
      valueGetter: (params: GridValueGetterParams) => `${params.row.question}`,
    },
    {
      field: 'points',
      width: isMobile ? 100 : 150,
      renderHeader: () => <h5 className='font-medium'>คะแนน</h5>,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.points || ''}`,
    },
    {
      field: 'limitTime',
      width: isMobile ? 200 : 250,
      renderHeader: () => (
        <h5 className='font-medium'>เวลาในการตอบคำถาม (นาที)</h5>
      ),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.limitTime || ''}`,
    },
    {
      field: 'Action',
      width: isMobile ? 125 : 150,
      renderHeader: () => <h5 className='font-medium'>จัดการ</h5>,
      renderCell: (params) => {
        return (
          <div className='flex flex-row items-center space-x-4'>
            <ViewButton href={`/challenge/quiz/detail/${params.row.id}`} />
            <DeleteButton
              loadData={loadQuizAll}
              api={API_PATH.DELETE_QUIZ(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className='w-full'>
      <BaseTable rows={quiz} columns={columns} loading={!!quizData.length} />
    </div>
  );
};

export default QuizTable;
