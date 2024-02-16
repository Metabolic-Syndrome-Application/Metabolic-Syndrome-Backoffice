import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { axiosAuth } from '@/lib/axios';

import { FormCreatePlanProps } from '@/components/form/validation/PlanValidator';

import { API_PATH } from '@/config/api';
import { addIndexPlan } from '@/helpers/number';

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

export const fetchAllPlans = createAsyncThunk('fetchAllPlans', async () => {
  try {
    const {
      data: { data },
    } = await axiosAuth.get<IGetPlanAllApi>(API_PATH.GET_PLAN_ALL);
    const usersWithIndex = data.plan ? addIndexPlan(data.plan) : [];
    return usersWithIndex;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Ensure the error is propagated
  }
});

export const fetchPlanById = createAsyncThunk(
  'fetchPlanById',
  async (id: string) => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get(API_PATH.GET_PLAN(id));
      console.log('Get 1 plan', data.plan);
      return data.plan;
    } catch (error) {
      console.log('Error fetching user data:', error);
      throw error; // Ensure the error is propagated
    }
  }
);

// Define the updatePlan thunk to update the plan with old values
export const updatePlan = createAsyncThunk(
  'updatePlan',
  async ({
    id,
    updatedData,
  }: {
    id: string;
    updatedData: FormCreatePlanProps;
  }) => {
    try {
      // Fetch the current plan data by ID
      const currentPlan = await axiosAuth.get(`/api/plan/${id}`);
      const mergedData = { ...currentPlan.data.data.plan, ...updatedData };

      // Send the merged data to the server for updating
      const response = await axiosAuth.put(API_PATH.PUT_PLAN(id), mergedData);
      console.log('update data', response);
      return response.data;
    } catch (error) {
      console.error('Error updating plan:', error);
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
    getPlanById: (state: PlanState, action: PayloadAction<string>) => {
      const id = action.payload;
      const getPlan = state.plan.find((item) => item.id === id);
      state.plan = getPlan ? [getPlan] : []; // Update the plan array with the found plan or an empty array if not found
      state.status = 'succeeded'; // Update status
      state.error = false; // Reset error
    },
    updatePlanById: (state, action: PayloadAction<IPlanData>) => {
      const updatedPlan = action.payload;
      state.plan = state.plan.map((plan) =>
        plan.id === updatedPlan.id ? updatedPlan : plan
      );
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
      .addCase(fetchPlanById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlanById.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        action.payload.date = new Date().toISOString();
        state.plan = {
          ...state.plan,
          ...action.payload,
          date: new Date().toISOString(),
        };
        console.log('success', action.payload);
        state.status = 'succeeded';
      })

      .addCase(fetchPlanById.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })

      .addCase(updatePlan.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('Update could not complete');
          return;
        }
        const updatedPlan = {
          ...action.payload,
          date: new Date().toISOString(),
        };
        state.plan = state.plan.map((plan: IPlanData) =>
          plan.id === updatedPlan.id ? updatedPlan : plan
        );
      });
  },
});

export const selectAllPlans = (state: { plan: PlanState }) => state.plan.plan;

// export const selectPlanById = (state: { plan: PlanState }, planId: any) =>
//   state.plan.plan.find((plan: IPlanData) => plan.id === planId);
export const selectPlanById = (state: { plan: PlanState }, planId: string) =>
  state.plan.plan.find((plan: any) => plan.id === planId);

export const { getPlans, getPlanById, updatePlanById } = plansSlice.actions;

export default plansSlice.reducer;
