import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import classesReducer from './slices/classesSlice';
import scheduleSlice from './slices/scheduleSlice';
import userSlice from './slices/userSlice';
import bookingSlice from './slices/bookingSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        classes: classesReducer,
        schedules: scheduleSlice,
        user: userSlice,
        bookings: bookingSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;