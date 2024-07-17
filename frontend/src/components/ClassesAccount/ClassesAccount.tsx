import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../reducer/store';
import { fetchSchedules } from '../../reducer/slices/scheduleSlice';
import { createBooking } from '../../reducer/slices/bookingSlice';
import { ISchedules } from '../../models/ISchedules';
import { Box, Button, Typography, Grid, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ClassesAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const schedules = useSelector((state: RootState) => state.schedules.schedules as ISchedules[]);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [selectedClass, setSelectedClass] = React.useState<string>('');

  React.useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  const groupedSchedules = schedules.reduce((acc: { [key: string]: ISchedules[] }, schedule: ISchedules) => {
    const day = schedule.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(schedule);
    return acc;
  }, {});

  const handleClassChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedClass(event.target.value as string);
  };

  const handleSignUp = (scheduleId: string) => {
    if (userId) {
      dispatch(createBooking({
        user_id: userId,
        class_schedule_id: scheduleId,
        status: 'pending'
      })).then(() => {
        alert(`Вы записаны на занятие: ${scheduleId}`);
      }).catch((error) => {
        console.error('Ошибка записи на занятие:', error);
        alert('Ошибка записи на занятие');
      });
    }
  };

  return (
    <Box sx={{ padding: 2, marginLeft: '50px' }}>
      <Typography variant="h4" gutterBottom>Расписание занятий</Typography>
      <Box sx={{ marginTop: 2, marginBottom: 5 }}>
        <FormControl fullWidth>
          <InputLabel>Выберите занятие</InputLabel>
          <Select value={selectedClass} onChange={handleClassChange}>
            {schedules.map((schedule) => (
              <MenuItem key={schedule.id} value={schedule.id}>
                {schedule.classes} ({schedule.start_time} - {schedule.end_time} на {schedule.day})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={() => handleSignUp(selectedClass)} disabled={!selectedClass}>
          Записаться на выбранное занятие
        </Button>
      </Box>
      {Object.keys(groupedSchedules).map((day) => (
        <Box key={day} sx={{ marginBottom: 4 }}>
          <Typography variant="h6">{day}</Typography>
          <Grid container spacing={2}>
            {groupedSchedules[day].map((schedule) => (
              <Grid item xs={12} sm={6} md={4} key={schedule.id}>
                <Paper sx={{ padding: 2 }}>
                  <Typography variant="body1"><strong>Занятие:</strong> {schedule.classes}</Typography>
                  <Typography variant="body2"><strong>Время:</strong> {schedule.start_time.slice(0,-3)} - {schedule.end_time.slice(0,-3)}</Typography>
                  <Button variant="contained" sx={{ 
                                bgcolor: '#9370DB', 
                                color: '#fff', 
                                '&:hover': {backgroundColor: '#7A5DC7', }}} onClick={() => handleSignUp(schedule.id)}>
                    Записаться
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ClassesAccount;
