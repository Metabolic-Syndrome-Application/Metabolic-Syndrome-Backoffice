import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { API_PATH } from '@/config/api';
import { addIndexRecord } from '@/helpers/number';

import { IGetRecordHealthAll, IRecordHealthData } from '@/types/patient';

interface recordState {
  record: IRecordHealthData[];
  status: string;
  error: boolean;
}

const initialState: recordState = {
  record: [],
  status: 'idle',
  error: false,
};

//ข้อมูลสุขภาพจาก Record Health ทั้ง hospital & paitent แต่ละ id
export const fetchRecordAllById = createAsyncThunk(
  'fetchRecordAllById',
  async (id: string) => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetRecordHealthAll>(
        API_PATH.GET_RECORD_HEALTH_BY_ALL(id)
      );
      const usersWithIndex = data.record ? addIndexRecord(data.record) : [];

      // console.log('record redux', usersWithIndex);
      return usersWithIndex;
    } catch (error) {
      console.log('Error fetching user data id:', error);
      throw error;
    }
  }
);

//ข้อมูลสุขภาพจาก Record Health จากแค่ hospital (หมอ/พยาบาลเป็นคนบันทึห)
export const fetchRecordHospitalById = createAsyncThunk(
  'fetchRecordHospitalById',
  async (id: string) => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetRecordHealthAll>(
        API_PATH.GET_RECORD_HEALTH_BY_HOSPITAL(id)
      );
      const usersWithIndex = data.record ? addIndexRecord(data.record) : [];

      console.log('record hospital redux', usersWithIndex);
      return usersWithIndex;
    } catch (error) {
      console.log('Error fetching user data id:', error);
      throw error;
    }
  }
);

const recordsSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    getRecords: (state, action: PayloadAction<IRecordHealthData[]>) => {
      state.record = action.payload;
      state.status = 'succeeded';
    },
    getIdrecord: (state, action: PayloadAction<IRecordHealthData>) => {
      state.record = [action.payload]; // Store the single record as an array
      state.status = 'succeeded';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecordAllById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecordAllById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.record = action.payload || [];

        // console.log('usersWithIndex', action.payload);
      })
      .addCase(fetchRecordAllById.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      .addCase(fetchRecordHospitalById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecordHospitalById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.record = action.payload || [];
      })
      .addCase(fetchRecordHospitalById.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

//All Record Health
export const selectAllrecords = (state: { record: recordState }) =>
  state.record.record;

//Lastest All Record Health
export const selectRecordById = (state: { record: recordState }) =>
  state.record.record[0];

export const { getRecords, getIdrecord } = recordsSlice.actions;

export default recordsSlice.reducer;
