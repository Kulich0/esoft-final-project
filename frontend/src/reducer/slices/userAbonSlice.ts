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
        console.log('Fetching user abons for userId:', userId);
        const response = await UserAbonService.fetchUserAbonsById(userId);
        console.log('Fetch response data:', response.data);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Fetch user abons error:', axiosError.message);
        if (axiosError.response) {
          console.error('Error response data:', axiosError.response.data);
          console.error('Error response status:', axiosError.response.status);
        } else {
          console.error('No response received from server.');
        }
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
    reducers: {
      updateAbonSessions: (state, action: PayloadAction<{ abonement_id: number, user_id: number }>) => {
        const abon = state.userAbons.find((a) => a.abonement_id === action.payload.abonement_id && a.user_id === action.payload.user_id);
        if (abon) {
          abon.abonement_sessions -= 1;
        }
      },
    },
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
                console.error('Fetch user abons rejected:', action.payload);
            });
    },
});
export const { updateAbonSessions } = userAbonSlice.actions;
export default userAbonSlice.reducer;
  
