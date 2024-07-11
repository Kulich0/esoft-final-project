import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import classesReducer from './slices/classesSlice';
import scheduleSlice from './slices/scheduleSlice';
import userSlice from './slices/userSlice';
import bookingSlice from './slices/bookingSlice';
import abonsSlice from './slices/abonSlice';
import userAbonSlice from './slices/userAbonSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        classes: classesReducer,
        schedules: scheduleSlice,
        user: userSlice,
        bookings: bookingSlice,
        abons:abonsSlice, 
        userAbons: userAbonSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
