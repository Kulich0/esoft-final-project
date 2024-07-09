import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IClasses } from '../../models/IClasses';
import ClassesService from '../../services/ClassesService';

interface ClassesState {
  classes: IClasses[];
  loading: boolean;
  error: string | null;
}

const initialState: ClassesState = {
  classes: [],
  loading: false,
  error: null,
};

interface AsyncThunkConfig {
  rejectValue: string;
}

export const fetchClasses = createAsyncThunk<IClasses[], void, AsyncThunkConfig>(
  'classes/fetchClasses',
  async (_, thunkAPI) => {
    try {
      const response = await ClassesService.fetchClasses();
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data as string);
    }
  }
);

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default classesSlice.reducer;
