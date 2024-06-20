import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Modal, Typography } from '@mui/material';

const schedule = [
  { day: 'Понедельник', times: ['7:30-8:45'], classes: ['Йога в гамаках для начинающих'] },
  { day: 'Вторник', times: ['7:00-8:20', '8:25-9:30', '14:20-15:20', '15:30-16:40'], classes: ['Йога в гамаках для начинающих и продолжающих', 'Йога в гамаках для начинающих и продолжающих', 'Группа здоровья', 'Йога в гамаках для начинающих и продолжающих'] },
  { day: 'Среда', times: ['7:30-8:45'], classes: ['Йога в гамаках для начинающих'] },
  { day: 'Четверг', times: ['7:00-8:20', '8:25-9:45', '14:20-15:20', '15:30-16:40'], classes: ['Хатха-йога', 'Хатха-йога', 'Группа здоровья', 'Хатха-йога'] },
  { day: 'Пятница', times: ['7:30-8:45'], classes: ['Йога в гамаках для начинающих'] },
  { day: 'Суббота', times: ['7:15-8:45'], classes: ['Хатха-йога'] },
];

export default function ScheduleTable() {
  const [open, setOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({ time: '', className: '' });

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
