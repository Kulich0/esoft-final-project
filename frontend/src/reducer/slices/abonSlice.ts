import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IAbon } from "../../models/IAbon"
import AbonService from '../../services/AbonService';

interface AbonsState {
    abonements: IAbon[];
  loading: boolean;
  error: string | null;
}

const initialState: AbonsState = {
    abonements: [],
    loading: false,
    error: null,
};

interface AsyncThunkConfig {
  rejectValue: string;
}

export const fetchAbons = createAsyncThunk<IAbon[], void, AsyncThunkConfig>(
  'abonements/fetchAbons',
  async (_, thunkAPI) => {
    try {
      const response = await AbonService.fetchAbons();
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data as string);
    }
  }
);

const abonsSlice = createSlice({
  name: 'abonements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbons.fulfilled, (state, action) => {
        state.loading = false;
        state.abonements = action.payload;
      })
      .addCase(fetchAbons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default abonsSlice.reducer;
