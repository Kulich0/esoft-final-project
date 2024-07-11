import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ISchedules } from "../../models/ISchedules"
import ScheduleService from '../../services/ScheduleService';

interface ScheduleState {
  schedules: ISchedules[];
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
    schedules: [],
    loading: false,
    error: null,
};

interface AsyncThunkConfig {
  rejectValue: string;
}

export const fetchSchedules = createAsyncThunk<ISchedules[], void, AsyncThunkConfig>(
  'class-schedule/fetchSchedules',
  async (_, thunkAPI) => {
    try {
      const response = await ScheduleService.fetchSchedules();
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data as string);
    }
  }
);

const schedulesSlice = createSlice({
  name: 'class-schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default schedulesSlice.reducer;
