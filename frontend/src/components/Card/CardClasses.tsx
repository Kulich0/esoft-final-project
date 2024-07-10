import * as React from 'react';
import { styled, Typography, Button, Card, CardActions, CardContent, CardMedia, Grid, Modal, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses } from '../../reducer/slices/classesSlice';
import { RootState, AppDispatch } from '../../reducer/store';
import { IClasses } from '../../models/IClasses';

const StyledCardMedia = styled(CardMedia)({
  height: 400,
  width: '100%',
});

const StyledCard = styled(Card)({
  width: 300,
  height: 450,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '10px',
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CardClasses: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useSelector((state: RootState) => state.classes.classes as IClasses[]);

  const [open, setOpen] = React.useState(false);
  const [selectedDescription, setSelectedDescription] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleOpen = (description: string) => {
    setSelectedDescription(description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDescription('');
  };

/*   const bufferToUint8Array = (buffer: { type: string; data: number[] } | null): Uint8Array => {
    if (buffer && buffer.data) {
        return new Uint8Array(buffer.data);
    } else {
        console.error('Buffer is null or missing data');
        return new Uint8Array(); // Возвращаем пустой массив, если данных нет
    }
}; */

/* const getImageUrl = (buffer: { type: string; data: number[] } | null): string => {
    const uint8Array = bufferToUint8Array(buffer);
    if (uint8Array.length === 0) {
        console.error('Uint8Array is empty');
        return ''; 
    }
    try {
        const blob = new Blob([uint8Array], { type: 'image/jpeg' }); 
        const url = URL.createObjectURL(blob);
        return url;
    } catch (error) {
        console.error('Error creating URL for image:', error);
        return '';
    }
}; */

  return (
    <>
      <Grid container spacing={1} sx={{ paddingLeft: 1, paddingRight: 1 }}>
        {classes.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} sx={{ padding: '5px' }}>
            <StyledCard>
              {/* <StyledCardMedia
                image={getImageUrl(card.profile_picture)} 
                title={card.title}
                component="img" 
              /> */}
              <StyledCardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
              </StyledCardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ bgcolor: '#9370DB', color: '#fff', marginTop: 'auto', '&:hover': { backgroundColor: '#7A5DC7' } }}
                  onClick={() => handleOpen(card.description)}
                >
                  Узнать больше
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Описание
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {selectedDescription}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default CardClasses;
