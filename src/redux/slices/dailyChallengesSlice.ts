//Daily Challenge
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { API_PATH } from '@/config/api';
import { addIndexDailyChallenge } from '@/helpers/number';

import {
  IDailyChallengeData,
  IGetDailyChallengeAllApi,
  IGetDailyChallengeIdApi,
} from '@/types/challenge';

interface DailyChallengeState {
  daily: IDailyChallengeData[];
  status: string;
  error: boolean;
}

const initialState: DailyChallengeState = {
  daily: [],
  status: 'idle',
  error: false,
};

export const fetchAllDailyChallenge = createAsyncThunk(
  'fetchAllDailyChallenge',
  async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetDailyChallengeAllApi>(
        API_PATH.GET_DAILY_CHALLENGE_ALL
      );
      const dailysWithIndex = data.daily
        ? addIndexDailyChallenge(data.daily)
        : [];

      console.log('daily redux', dailysWithIndex);
      return dailysWithIndex;
    } catch (error: any) {
      // console.error('Error fetching All Dailys', error);
      throw new Error(`Error fetching All Dailys ${error.message}`);
    }
  }
);

export const fetchDailyChallengeById = createAsyncThunk(
  'fetchDailyChallengeById',
  async (id: string) => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetDailyChallengeIdApi>(
        API_PATH.GET_DAILY_CHALLENGE(id)
      );
      console.log('Get 1 daily id', data.daily);
      return data.daily;
    } catch (error: any) {
      // console.error('Error fetching Daily ID', error);
      throw new Error(`Error fetching Daily ID ${error.message}`);
    }
  }
);

const dailyChallengesSlice = createSlice({
  name: 'daily',
  initialState,
  reducers: {
    getDailys: (state, action: PayloadAction<IDailyChallengeData[]>) => {
      state.daily = action.payload;
      state.status = 'succeeded';
    },
    getIdDaily: (state, action: PayloadAction<IDailyChallengeData>) => {
      state.daily = [action.payload];
      state.status = 'succeeded';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllDailyChallenge.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDailyChallenge.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.daily = action.payload || [];

        console.log('dailys WithIndex', action.payload);
      })
      .addCase(fetchAllDailyChallenge.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      .addCase(fetchDailyChallengeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDailyChallengeById.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update Daily could not complete');
          console.log(action.payload);
          return;
        }

        state.daily = [action.payload];
        // console.log('redux2 fetchDailyChallengeById', action.payload);
        state.status = 'succeeded';
      })

      .addCase(fetchDailyChallengeById.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

export const selectAllDailyChallenge = (state: {
  daily: DailyChallengeState;
}) => state.daily.daily;

export const selectDailyChallengeById = (state: {
  daily: DailyChallengeState;
}) => state.daily.daily[0];

export const { getDailys, getIdDaily } = dailyChallengesSlice.actions;

export default dailyChallengesSlice.reducer;
