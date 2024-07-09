import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../reducer/store';
import { fetchSchedules } from '../../reducer/slices/scheduleSlice';
import { ISchedules } from '../../models/ISchedules';

const ScheduleTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const schedules = useSelector((state: RootState) => state.schedules.schedules);
  


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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, marginTop: '70px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.keys(groupedSchedules).map(day => (
              <TableCell key={day} align="center">
                <Typography variant="h6">{day}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {Object.keys(groupedSchedules).map(day => (
              <TableCell key={day} align="center" sx={{ verticalAlign: 'top', paddingRight: '25px' }}>
                {groupedSchedules[day].map(schedule => (
                  <Box
                    key={schedule.id}
                    sx={{
                      backgroundColor: '#E6E6FA',
                      color: 'black',
                      padding: '8px',
                      borderRadius: '10px',
                      marginBottom: '60px',
                      width: '200px',
                      height: '100px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: '30px',
                      cursor: 'pointer'
                    }}
                  >
                    <Typography>{schedule.start_time.slice(0, -3)} - {schedule.end_time.slice(0, -3)}</Typography>
                    <Typography>{schedule.classes}</Typography>
                  </Box>
                ))}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScheduleTable;
