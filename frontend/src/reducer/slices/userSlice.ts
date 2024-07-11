import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService';

interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

interface AsyncThunkConfig {
  rejectValue: string;
}

export const fetchUserById = createAsyncThunk<IUser, string, AsyncThunkConfig>(
  'user/fetchUserById',
  async (userId, thunkAPI) => {
    try {
      const response = await UserService.fetchUserById(userId);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data as string);
    }
  }
);

export const updateUser = createAsyncThunk<IUser, { id: string; updatedUser: IUser }, AsyncThunkConfig>(
  'user/updateUser',
  async ({ id, updatedUser }, thunkAPI) => {
    try {
      const response = await UserService.UpdateUser(id, updatedUser);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data as string);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
