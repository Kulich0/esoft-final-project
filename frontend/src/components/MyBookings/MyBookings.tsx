import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../reducer/store';
import { fetchUserBookings, deleteBooking } from '../../reducer/slices/bookingSlice';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';

const MyBookings = () => {
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const bookings = useSelector((state: RootState) => state.bookings.bookings);
  const loading = useSelector((state: RootState) => state.bookings.loading);
  const error = useSelector((state: RootState) => state.bookings.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserBookings(userId.toString()));
    }
  }, [dispatch, userId]);

  const handleDeleteBooking = (bookingId: string) => {
    dispatch(deleteBooking(bookingId))
      .then(() => {
        alert(`Запись с ID ${bookingId} успешно отменена`);
      })
      .catch((error) => {
        console.error('Ошибка отмены записи:', error);
        alert('Ошибка отмены записи');
      });
  };

  if (loading) {
    return <Typography>Загрузка данных...</Typography>;
  }

  if (error) {
    return <Typography>Ошибка: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2, marginLeft: '50px' }}>
      <Typography variant="h4" gutterBottom>Мои записи на занятия</Typography>
      <Grid container spacing={2}>
        {bookings.length === 0 ? (
          <Typography>У вас нет записей на занятия.</Typography>
        ) : (
          bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking.id}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="body1"><strong>ID записи:</strong> {booking.id}</Typography>
                <Typography variant="body2"><strong>ID пользователя:</strong> {booking.user_id}</Typography>
                <Typography variant="body2"><strong>ID расписания занятия:</strong> {booking.class_schedule_id}</Typography>
                <Typography variant="body2"><strong>Время бронирования:</strong> {booking.booking_time}</Typography>
                <Typography variant="body2"><strong>Статус:</strong> {booking.status}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#9370DB',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#7A5DC7' }
                  }}
                  onClick={() => handleDeleteBooking(booking.id.toString())}
                >
                  Отменить запись
                </Button>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default MyBookings;
