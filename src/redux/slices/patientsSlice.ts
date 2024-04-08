import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { API_PATH } from '@/config/api';
import { addIndexPatient } from '@/helpers/number';

import {
  IGetProfilePatientAllApi,
  IGetProfilePatientIdApi,
  IPatientData,
} from '@/types/patient';

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

//Admin manange role patient (มีทั้งมีและไม่มี hn)
export const fetchRolePatients = createAsyncThunk(
  'fetchRolePatients',
  async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetProfilePatientAllApi>(API_PATH.GET_PATIENT);

      const usersWithIndex = data.users ? addIndexPatient(data.users) : [];
      console.log('role patient redux', usersWithIndex);
      return usersWithIndex;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error);
      throw error;
    }
  }
);

//All Patient (have hn)
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
      //console.log('patient redux', usersWithIndex);
      return usersWithIndex;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error);
      throw error;
    }
  }
);

//Only Patient ID
export const fetchPatientById = createAsyncThunk(
  'fetchPatientById',
  async (id: string) => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetProfilePatientIdApi>(
        API_PATH.GET_PROFILE_PATIENT_OTHER(id)
      );
      // console.log('Get 1 patient', data.user);
      return data.user;
    } catch (error) {
      console.log('Error fetching patient data id:', error);
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
    getIdPatient: (state, action: PayloadAction<IPatientData>) => {
      state.patients = [action.payload];
      state.status = 'succeeded';
    },
  },
  extraReducers(builder) {
    builder
      //Admin manage role patient
      .addCase(fetchRolePatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRolePatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload || [];
      })
      .addCase(fetchRolePatients.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      //All Patients (hn)
      .addCase(fetchAllPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload || [];
      })
      .addCase(fetchAllPatients.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      //Only Patient ID
      .addCase(fetchPatientById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = [action.payload]; // Wrap the payload in an array

        //console.log('Patient id2:', action);
      })

      .addCase(fetchPatientById.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

export const selectAllPatients = (state: { patients: PatientState }) =>
  state.patients;

export const selectPatientById = (state: { patients: PatientState }) =>
  state.patients.patients[0];

export const { getPatients, getIdPatient } = patientsSlice.actions;

export default patientsSlice.reducer;
