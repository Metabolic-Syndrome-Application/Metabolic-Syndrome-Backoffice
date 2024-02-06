import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { addIndexPlan } from '@/components/helpers/number';

import { API_PATH } from '@/config/api';

import { IGetPlanAllApi, IPlanData } from '@/types/plan';

interface PlanState {
  plan: IPlanData[];
  status: string;
  error: boolean;
}

const initialState: PlanState = {
  plan: [],
  status: 'idle',
  error: false,
};

export const fetchPlans = createAsyncThunk('fetchPlans', async () => {
  try {
    const {
      data: { data },
    } = await axiosAuth.get<IGetPlanAllApi>(API_PATH.GET_PLAN_ALL);
    console.log('Get All plan', data);

    // change to addIndexPlan
    //const usersWithIndex = addIndexPlan(data.plan);
    const usersWithIndex = data.plan ? addIndexPlan(data.plan) : [];
    console.log('Get All plan', usersWithIndex);

    return usersWithIndex;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

const plansSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    getPlans: (state, action: PayloadAction<IPlanData[]>) => {
      return {
        ...state,
        plan: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';

        console.log('API Response2:', action.payload);

        state.plan = action.payload || [];

        // console.log('usersWithIndex', action.payload);
      })
      .addCase(fetchPlans.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

export const selectAllPlans = (state: { plan: PlanState }) => state.plan.plan;

export const { getPlans } = plansSlice.actions;

export default plansSlice.reducer;
