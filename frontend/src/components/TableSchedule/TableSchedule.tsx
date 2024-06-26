import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Modal, Typography } from '@mui/material';
import { loadSchedule } from '../../reducer/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectSchedule } from '../../reducer/selectors';

const ScheduleTable: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({ time: '', className: '' });
  const dispatch = useDispatch();
  const schedule = useSelector(selectSchedule);

  React.useEffect(() => {
    dispatch(loadSchedule());
}, [dispatch]);

  const handleOpen = (time, className) => {
    setModalContent({ time, className });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, marginTop: '70px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {schedule.map((day) => (
              <TableCell key={day.day} align="center">{day.day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: Math.max(...schedule.map(day => day.times.length)) }, (_, index) => (
            <TableRow key={index}>
              {schedule.map((day, i) => (
                <TableCell key={i} align="center">
                  {day.times[index] ? (
                    <Box sx={{
                      backgroundColor: '#E6E6FA',
                      color: 'black',
                      padding: '8px',
                      borderRadius: '10px',
                      marginBottom: '4px',
                      width: '200px',
                      height: '100px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }} onClick={() => handleOpen(day.times[index], day.classes[index] || '')}>
                      <div>{day.times[index]}</div>
                      <div>{day.classes[index] || ''}</div>
                    </Box>
                  ) : ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            {modalContent.className}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Время: {modalContent.time}
          </Typography>
        </Box>
      </Modal>
    </TableContainer>
  );
}
export default ScheduleTable;