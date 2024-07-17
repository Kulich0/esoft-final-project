import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import UserAbonService from '../../services/UserAbonService';
import { IUserAbon } from '../../models/IUserAbon';

interface UserAbonState {
    userAbons: IUserAbon[];
    loading: boolean;
    error: string | null;
}

const initialState: UserAbonState = {
    userAbons: [],
    loading: false,
    error: null,
};

interface AsyncThunkConfig {
    rejectValue: string;
  }
  
  export const fetchUserAbonsById = createAsyncThunk<IUserAbon[], number, AsyncThunkConfig>(
    'userAbons/fetchById',
    async (userId, thunkAPI) => {
      try {
        const response = await UserAbonService.fetchUserAbonsById(userId);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        return thunkAPI.rejectWithValue(axiosError.response?.data as string);
      }
    }
  );

  export const createAbons = createAsyncThunk<IUserAbon, IUserAbon, AsyncThunkConfig>(
    'userAbons/createAbons',
    async (newAbons, thunkAPI) => {
      try {
        const response = await UserAbonService.creatingAbons(newAbons);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        return thunkAPI.rejectWithValue(axiosError.response?.data as string);
      }
    }
  );
  
  const userAbonSlice = createSlice({
    name: 'userAbons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAbonsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserAbonsById.fulfilled, (state, action: PayloadAction<IUserAbon[]>) => {
                state.loading = false;
                state.userAbons  = action.payload;
            })
            .addCase(fetchUserAbonsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            
            .addCase(createAbons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAbons.fulfilled,  (state, action) => {
                state.loading = false,
                state.userAbons.push(action.payload)
            })
            .addCase(createAbons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userAbonSlice.reducer;
  
