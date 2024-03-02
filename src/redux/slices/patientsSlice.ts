import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { API_PATH } from '@/config/api';
import { addIndexPatient } from '@/helpers/number';

import { IGetProfilePatientAllApi, IPatientData } from '@/types/patient';

interface PatientState {
  patients: IPatientData[];
  status: string;
  error: boolean;
}

const initialState: PatientState = {
  patients: [],
  status: 'idle',
  error: false,
};

export const fetchAllPatients = createAsyncThunk(
  'fetchAllPatients',
  async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetProfilePatientAllApi>(
        API_PATH.GET_PROFILE_ALL
      );

      const usersWithIndex = data.users ? addIndexPatient(data.users) : [];
      console.log('patient redux', usersWithIndex);
      return usersWithIndex;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
);

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    getPatients: (state, action: PayloadAction<IPatientData[]>) => {
      state.patients = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload || [];

        console.log('Patient y:', action);
      })
      .addCase(fetchAllPatients.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

export const selectAllPatients = (state: { patients: PatientState }) =>
  state.patients;

export const { getPatients } = patientsSlice.actions;

export default patientsSlice.reducer;
