import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IBookings } from '../../models/IBookings';
import ClassBookingsService from '../../services/ClassBookingsService';

interface BookingsState {
  bookings: IBookings[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

interface AsyncThunkConfig {
  rejectValue: string;
}



export const fetchUserBookings = createAsyncThunk<IBookings[], string, AsyncThunkConfig>(
  'bookings/fetchUserBookings',
  async (bookingId, thunkAPI) => {
    try {
      const response = await ClassBookingsService.fetchBookingsByUserId(bookingId);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data as string);
    }
  }
);

export const createBooking = createAsyncThunk<IBookings, IBookings, AsyncThunkConfig>(
  'bookings/createBooking',
  async (newBooking, thunkAPI) => {
    try {
      const response = await ClassBookingsService.createBooking(newBooking);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data as string);
    }
  }
);

export const deleteBooking = createAsyncThunk<void, string, AsyncThunkConfig>(
  'bookings/deleteBooking',
  async (bookingId, thunkAPI) => {
    try {
      await ClassBookingsService.deleteBooking(bookingId);
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data as string);
    }
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    removeBookingOptimistic: (state, action) => {
      state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { removeBookingOptimistic } = bookingsSlice.actions;

export default bookingsSlice.reducer;

