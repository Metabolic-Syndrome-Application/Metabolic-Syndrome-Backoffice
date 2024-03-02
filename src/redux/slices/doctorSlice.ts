// Redux slice for doctors
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { API_PATH } from '@/config/api';
import { addIndexUser } from '@/helpers/number';

import { IGetProfileAllApi, IUserData } from '@/types/user';

// Define the initial state
interface DoctorState {
  doctors: IUserData[];
  status: string;
  error: boolean;
}

const initialState: DoctorState = {
  doctors: [],
  status: 'idle',
  error: false,
};

export const fetchAllDoctors = createAsyncThunk('fetchAllDoctors', async () => {
  try {
    const {
      data: { data },
    } = await axiosAuth.get<IGetProfileAllApi>(API_PATH.GET_PROFILE_ALL_DOCTOR);

    const usersWithIndex = data.users ? addIndexUser(data.users) : [];
    //console.log('doctor redux', usersWithIndex);
    return usersWithIndex;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
});

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    getDoctors: (state, action: PayloadAction<IUserData[]>) => {
      state.doctors = action.payload;
      state.status = 'succeeded';
    },
    getIdDoctor: (state, action: PayloadAction<IUserData>) => {
      state.doctors = [action.payload]; // Store the single quiz as an array
      state.status = 'succeeded';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload || [];
      })
      .addCase(fetchAllDoctors.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

export const selectAllDoctors = (state: { doctors: DoctorState }) =>
  state.doctors.doctors;

export const selectDoctorById = (state: { doctors: DoctorState }) =>
  state.doctors.doctors[0];

export default doctorSlice.reducer;
