import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { AuthResponse } from '../../models/response/AuthResponse';
import { IUser } from '../../models/IUser';
import { AxiosError } from 'axios';

interface AuthState {
    user: IUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

export const login = createAsyncThunk(
    'user/login',
    async (userData: { email: string, password: string }, thunkAPI) => {
        try {
            const response = await AuthService.login(userData.email, userData.password);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return thunkAPI.rejectWithValue(axiosError.response?.data as string);
        }
    }
);

export const registration = createAsyncThunk(
    'user/registration',
    async (userData: { email: string, password: string, name: string }, thunkAPI) => {
      try {
        const response = await AuthService.registration(userData.email, userData.password, userData.name);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        return thunkAPI.rejectWithValue(axiosError.response?.data || axiosError.message);
      }
    }
  );
  

export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            await AuthService.logout();
        } catch (error) {
            const axiosError = error as AxiosError;
            return thunkAPI.rejectWithValue(axiosError.response?.data as string);
        }
    }
);

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            }) 
            .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })



            .addCase(registration.pending, (state) => {
                state.loading = true;
                state.error = null;
            }) 
            .addCase(registration.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;
            })
            .addCase(registration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            }) 
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },        
});

export const { setUser, setAccessToken, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
