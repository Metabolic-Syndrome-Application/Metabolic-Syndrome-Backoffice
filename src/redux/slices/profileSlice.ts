//Profile Doctor/Staff
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { FormCreateProfileDoctorProps } from '@/components/form/validation/UserValidator';

import { API_PATH } from '@/config/api';

import { IGetProfileMeApi, IUserData } from '@/types/user';

interface UserState {
  user: IUserData;
  status: string;
  error: boolean;
}

const initialState: UserState = {
  user: {
    id: '',
    username: '',
    role: '',
    prefix: '',
    firstName: '',
    lastName: '',
    gender: '',
    department: '',
    specialist: '',
  },
  status: 'idle',
  error: false,
};

export const fetchUser = createAsyncThunk('fetchUser', async () => {
  try {
    const {
      data: { data },
    } = await axiosAuth.get<IGetProfileMeApi>(API_PATH.GET_PROFILE_ME);
    //console.log('get profile me', data);

    return data.user;
  } catch (error: any) {
    // console.error('Error fetching Profile User', error);
    throw new Error(`Error fetching Profile User ${error.message}`);
  }
});

export const updateUser = createAsyncThunk(
  'updateUser',
  async (updatedData: FormCreateProfileDoctorProps) => {
    try {
      const response = await axiosAuth.put(
        API_PATH.PUT_PROFILE_ME,
        updatedData
      );
      //  console.log('update', response);
      return response.data;
    } catch (err: any) {
      //return err.message;
      return updatedData;
    }
  }
);

const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<IUserData>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log('API Response2:', action.payload);
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          //  console.log('Update could not complete');
          //  console.log(action.payload);
          return;
        }
        action.payload.date = new Date().toISOString();
        state.user = {
          ...state.user,
          ...action.payload,
          date: new Date().toISOString(),
        };
      });
  },
});

export const selectUser = (state: { user: UserState }) => state.user?.user;

export const { getUser } = profileSlice.actions;

export default profileSlice.reducer;
