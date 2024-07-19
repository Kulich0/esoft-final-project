import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../reducer/store';
import { fetchAbons } from '../../reducer/slices/abonSlice';
import { createAbons } from '../../reducer/slices/userAbonSlice';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import PaymentModal from '../PaymentModal/PaymentModal';
import axios from 'axios';

const Abonements: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { abonements, loading, error } = useSelector((state: RootState) => state.abons);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const [open, setOpen] = React.useState(false);
  const [selectedAbon, setSelectedAbon] = React.useState<{ title: string, id: number } | null>(null);

  const handleOpen = (abon: { title: string, id: number }) => {
    setSelectedAbon(abon);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAbon(null);
  };


  const handlePayment = async (sessions: number) => {
    if (userId && selectedAbon) {
      const amount = sessions === 4 ? 1800 :
                     sessions === 8 ? 3200 :
                     sessions === 12 ? 3600 : 0;
      try {
        const response = await axios.post('https://api-tc3t.onrender.com/api/create-payment', {
          amount: amount.toString(),
          description: `Оплата за ${sessions} занятий абонемента ${selectedAbon.title}`
        });
        window.location.href = response.data.confirmation_url;


        dispatch(
          createAbons({
            user_id: userId,
            abonement_id: selectedAbon.id,
            abonement_title: selectedAbon.title,
            abonement_sessions: sessions,
          })
        );
        handleClose();
      } catch (error) {
        alert('Ошибка при создании платежа. Попробуйте снова.');
      }
    }
  };

  React.useEffect(() => {
    dispatch(fetchAbons());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ padding: 3, marginLeft: 5 }}>
      <Typography variant="h4" gutterBottom>Абонементы</Typography>
      <Grid container spacing={3}>
        {abonements.map((abon) => (
          <Grid item xs={12} sm={6} md={4} key={abon.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  {abon.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {abon.sessions_4 && (
                    <div>4 занятия: 1800 руб.</div>
                  )}
                  {abon.sessions_8 && (
                    <div>8 занятий: 3200 руб.</div>
                  )}
                  {abon.sessions_12 && (
                    <div>12 занятий: 3600 руб.</div>
                  )}
                  {abon.individual_price && (
                    <div>Индивидуальные занятие: {abon.individual_price} руб.</div>
                  )}
                </Typography>
              </CardContent>
              <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    bgcolor: '#9370DB',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#7A5DC7' },
                  }}
                  onClick={() =>
                    handleOpen({
                      title: abon.title,
                      id: abon.id,
                    })
                  }
                >
                  Купить
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedAbon && (
        <PaymentModal
          open={open}
          onClose={handleClose}
          abonTitle={selectedAbon.title}
          abonId={selectedAbon.id}
          onPayment={(sessions) => handlePayment(sessions)}
        />
      )}
    </Box>
  );
};

export default Abonements;
