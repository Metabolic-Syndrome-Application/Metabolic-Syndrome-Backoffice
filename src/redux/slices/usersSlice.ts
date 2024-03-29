//Admin Manage Users
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { API_PATH } from '@/config/api';
import { addIndexUser } from '@/helpers/number';

import { IGetProfileAllApi, IUserData } from '@/types/user';

interface UserState {
  users: IUserData[]; //Define the type for users
  status: string;
  error: boolean;
}

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: false,
};

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const {
      data: { data },
    } = await axiosAuth.get<IGetProfileAllApi>(API_PATH.GET_PROFILE_ALL);
    //console.log('Admin Create Register:', data);

    // Assuming response.data.users is an array of IUserData
    const usersWithIndex = data.users ? addIndexUser(data.users) : [];
    return usersWithIndex;
  } catch (error: any) {
    // console.error('Error fetching All Users', error);
    throw new Error(`Error fetching All Users ${error.message}`);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<IUserData[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload || [];
        // console.log('Admin Create Register2:', action.payload);
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

export const selectAllUsers = (state: { users: UserState }) =>
  state.users.users;

export const { getUsers } = usersSlice.actions;

export default usersSlice.reducer;
