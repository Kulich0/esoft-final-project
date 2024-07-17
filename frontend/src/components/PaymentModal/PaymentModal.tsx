import React from 'react';
import { Box, Button, Modal, Typography, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  abonTitle: string;
  onPayment: (sessions: number) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, abonTitle, onPayment }) => {
  const [selectedSessions, setSelectedSessions] = React.useState<number | null>(null);

  const handlePayment = () => {
    if (selectedSessions !== null) {
      onPayment(selectedSessions);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #9370DB',
        borderRadius: '4px',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2">
          Покупка абонемента: {abonTitle}
        </Typography>
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <RadioGroup
            value={selectedSessions}
            onChange={(e) => setSelectedSessions(Number(e.target.value))}
          >
            <FormControlLabel value={4} control={<Radio/>} label="4 занятия" />
            <FormControlLabel value={8} control={<Radio/>} label="8 занятий" />
            <FormControlLabel value={12} control={<Radio/>} label="12 занятий" />
          </RadioGroup>
        </FormControl>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" sx={{
                    bgcolor: '#9370DB',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#7A5DC7' }
                  }} 
                  onClick={handlePayment} 
                  disabled={selectedSessions === null}>
            Оплатить
          </Button>
          <Button variant="outlined" sx={{ 
                  color: '#9370DB',
                  borderColor: '#9370DB',
                  '&:hover': { backgroundColor: '#f0f0f0', borderColor: '#9370DB' },
                }} 
                onClick={onClose}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
