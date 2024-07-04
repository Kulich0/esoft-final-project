import React from 'react';
import { Box, Typography, Grid, Button, styled } from '@mui/material';

const FullOverlay = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
  width: '100%',
});

const StyledBox = styled(Box)({
  backgroundColor: '#E6E6FADB',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '120px 0',
  marginTop: '0px',
});

const UnderlinedTypography = styled(Typography)({
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '67%',
    height: '1px',
    bottom: '-1px',
    left: '0',
    backgroundColor: 'black',
  },
});

const priceList = [
  { title: 'Йога в гамаках для начинающих', description: '4 занятия-1800, 8-занятий-3200, 12-3600 руб.' },
  { title: 'Йога в гамаках средний уровень', description: '4 занятия-1800, 8-занятий-3200, 12-3600 руб.' },
  { title: 'Хатха йога', description: '4 занятия-1800, 8-занятий-3200, 12-3600 руб.' },
  { title: 'Йога нидра', description: '4 занятия-1800, 8-занятий-3200, 12-3600 руб.' },
  { title: 'Индивидуальные тренинг', description: '1200 руб.' },
  { title: 'Группа здоровья', description: '4 занятия-1800, 8-занятий-3200, 12-3600 руб.' },
];

const Price: React.FC = () => {
  return (
    <StyledBox>
      <FullOverlay>
        <Typography variant='h3' component='h1' gutterBottom>
          Прайс
        </Typography>
      </FullOverlay>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {priceList.map((item, index) => (
          <Grid item xs={12} sm={5} key={index}>
            <UnderlinedTypography variant='body1'>{item.title}</UnderlinedTypography>
            <Typography variant='body2' component='div'>{item.description}</Typography>
          </Grid>
        ))}
      </Grid>
      <FullOverlay>
        <Button variant="contained" sx={{ backgroundColor: '#9370DB', marginTop: '20px' }}>
          Записаться
        </Button>
      </FullOverlay>
    </StyledBox>
  );
};

export default Price;
