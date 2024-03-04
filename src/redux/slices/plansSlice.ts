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
  } catch (error) {
    console.error('Error fetching plan:', error);
    throw error; // Ensure the error is propagated
  }
});

export const fetchPlanById = createAsyncThunk(
  'fetchPlanById',
  async (id: string) => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get<IGetPlanIdApi>(API_PATH.GET_PLAN(id));
      //console.log('Get 1 plan', data.plan);
      return data.plan;
    } catch (error) {
      console.log('Error fetching plan data id:', error);
      throw error; // Ensure the error is propagated
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
    // createPlan: (state, action: PayloadAction<IPlanData>) => {
    //   state.plan.push(action.payload);
    // },
    // getPlanById: (state: PlanState, action: PayloadAction<IPlanData>) => {
    //   const id = action.payload.id;
    //   const planIndex = state.plan.findIndex((item) => item.id === id);
    //   if (planIndex !== -1) {
    //     state.plan[planIndex] = action.payload;
    //   }
    // },
    // updatePlanById: (state, action: PayloadAction<IPlanData>) => {
    //   const updatedPlan = action.payload;
    //   state.plan = state.plan.map((plan) =>
    //     plan.id === updatedPlan.id ? updatedPlan : plan
    //   );
    // },
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
      .addCase(fetchPlanById.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(fetchPlanById.fulfilled, (state, action) => {
      //   if (!action.payload?.id) {
      //     console.log('Update could not complete');
      //     console.log(action.payload);
      //     return;
      //   }

      //   const updatedPlan: IPlanData = {
      //     ...action.payload,
      //     date: new Date().toISOString(),
      //   };

      //   state.plan = [updatedPlan]; // Replace the array with a single object
      //   state.status = 'succeeded';
      // })
      .addCase(fetchPlanById.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          return;
        }

        state.plan = [action.payload]; // Store the single quiz as an array
        console.log('redux2 fetchPlanById', action.payload);
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
