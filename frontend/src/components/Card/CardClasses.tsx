import * as React from 'react';
import { styled, Typography, Button, Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses } from '../../reducer/slices/classesSlice';
import { RootState, AppDispatch } from '../../reducer/store'; 

const StyledCardMedia = styled(CardMedia)({
  height: 350,
  width: 350,
});

const StyledCard = styled(Card)({
  width: 350,
  margin: '0 auto',
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const CardClasses: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useSelector((state: RootState) => state.classes.classes);

  React.useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={2} sx={{ paddingLeft: 2, paddingRight: 2 }}>
        {classes.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <StyledCard sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
              <StyledCardMedia /* image={card.image} */ title={card.title} />
              <StyledCardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </StyledCardContent>
              <CardActions>
                <Button variant="contained" sx={{ bgcolor: '#9370DB', color: '#fff' }}>Узнать больше</Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CardClasses;