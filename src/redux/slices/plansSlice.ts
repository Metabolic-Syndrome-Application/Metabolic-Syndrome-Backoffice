//Plan
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { API_PATH } from '@/config/api';
import { addIndexPlan } from '@/helpers/number';

import { IGetPlanAllApi, IGetPlanIdApi, IPlanData } from '@/types/plan';

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

export const fetchAllPlans = createAsyncThunk('fetchAllPlans', async () => {
  try {
    const {
      data: { data },
    } = await axiosAuth.get<IGetPlanAllApi>(API_PATH.GET_PLAN_ALL);
    const usersWithIndex = data.plan ? addIndexPlan(data.plan) : [];
    return usersWithIndex;
  } catch (error: any) {
    //console.error('Error fetching plan:', error);
    throw new Error(`Error fetching All Plan ${error.message}`);
  }
});

export const fetchAllPlansDefault = createAsyncThunk(
  'fetchAllPlansDefault',
  async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetPlanAllApi>(API_PATH.GET_PLAN_ALL_DEFAULT);
      const usersWithIndex = data.plan ? addIndexPlan(data.plan) : [];
      //console.log('fetchAllPlansDefault', data.plan);
      return usersWithIndex;
    } catch (error: any) {
      //console.error('Error fetching Plan Default:', error);
      throw new Error(`Error fetching only Plan Default ${error.message}`);
    }
  }
);

export const fetchPlanById = createAsyncThunk(
  'fetchPlanById',
  async (id: string) => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetPlanIdApi>(API_PATH.GET_PLAN(id));
      console.log('Get 1 plan id', data.plan);
      return data.plan;
    } catch (error: any) {
      //console.error('Error fetching Plan ID:', error);
      throw new Error(`Error fetching Plan ID ${error.message}`);
    }
  }
);

const plansSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    getPlans: (state, action: PayloadAction<IPlanData[]>) => {
      state.plan = action.payload;
      state.status = 'succeeded';
    },
    getPlanById: (state, action: PayloadAction<IPlanData>) => {
      state.plan = [action.payload];
      state.status = 'succeeded';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plan = action.payload || [];
      })
      .addCase(fetchAllPlans.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      .addCase(fetchAllPlansDefault.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPlansDefault.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plan = action.payload || [];
      })
      .addCase(fetchAllPlansDefault.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      .addCase(fetchPlanById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlanById.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('cannot fetch plan');
          return;
        }
        state.plan = [action.payload];
        state.status = 'succeeded';
      })
      .addCase(fetchPlanById.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

export const selectAllPlans = (state: { plan: PlanState }) => state.plan.plan;

//not used
// export const selectPlanById = (state: { plan: PlanState }, planId: any) =>
//   state.plan.plan.find((plan: IPlanData) => plan.id === planId);

export const selectPlanById = (state: { plan: PlanState }) =>
  state.plan.plan[0];

export const { getPlans, getPlanById } = plansSlice.actions;

export default plansSlice.reducer;
