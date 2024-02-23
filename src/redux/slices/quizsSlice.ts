import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { API_PATH } from '@/config/api';
import { addIndexQuiz } from '@/helpers/number';

import {
  IGetQuizAllApi,
  IGetQuizIdApi,
  IQuizChallengeData,
} from '@/types/challenge';

interface QuizState {
  quiz: IQuizChallengeData[];
  status: string;
  error: boolean;
}

const initialState: QuizState = {
  quiz: [],
  status: 'idle',
  error: false,
};

export const fetchAllQuizs = createAsyncThunk('fetchAllQuizs', async () => {
  try {
    const {
      data: { data },
    } = await axiosAuth.get<IGetQuizAllApi>(API_PATH.GET_QUIZ_ALL);
    const usersWithIndex = data.quiz ? addIndexQuiz(data.quiz) : [];

    console.log('quiz redux', usersWithIndex);
    return usersWithIndex;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Ensure the error is propagated
  }
});

export const fetchQuizById = createAsyncThunk(
  'fetchQuizById',
  async (id: string) => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetQuizIdApi>(API_PATH.GET_QUIZ(id));
      console.log('Get 1 quiz id', data.quiz);
      return data.quiz;
    } catch (error) {
      console.log('Error fetching user data id:', error);
      throw error;
    }
  }
);

const quizsSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    getQuizs: (state, action: PayloadAction<IQuizChallengeData[]>) => {
      state.quiz = action.payload;
      state.status = 'succeeded';
    },
    getIdQuiz: (state, action: PayloadAction<IQuizChallengeData>) => {
      state.quiz = [action.payload]; // Store the single quiz as an array
      state.status = 'succeeded';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllQuizs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllQuizs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quiz = action.payload || [];

        console.log('usersWithIndex', action.payload);
      })
      .addCase(fetchAllQuizs.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      .addCase(fetchQuizById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }

        state.quiz = [action.payload]; // Store the single quiz as an array
        state.status = 'succeeded';
      })

      .addCase(fetchQuizById.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

export const selectAllQuizs = (state: { quiz: QuizState }) => state.quiz.quiz;

export const selectQuizById = (state: { quiz: QuizState }) =>
  state.quiz.quiz[0];

export const { getQuizs, getIdQuiz } = quizsSlice.actions;

export default quizsSlice.reducer;
