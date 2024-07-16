import React from 'react';
import { Typography, Box, styled } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  maxWidth: '100%',
  margin: '0 auto',
  textAlign: 'left',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const ItemBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const Contacts: React.FC = () => {
  return (
    <StyledBox>
      <Typography variant="h4" component="h2" gutterBottom sx={{textAlign: 'center'}}>
        Контакты
      </Typography>
      <ItemBox>
        <LocationOnIcon fontSize="large" sx={{ color: '#9370DB', marginRight: 2 }} />
        <Box>
          <Typography variant="h6" component="h3">
            Адрес:
          </Typography>
          <Typography variant="body1">
            Тюмень, Спасская улица, 14
          </Typography>
        </Box>
      </ItemBox>
      <ItemBox>
        <PhoneIcon fontSize="large" sx={{ color: '#9370DB', marginRight: 2 }} />
        <Box>
          <Typography variant="h6" component="h3">
            Телефон:
          </Typography>
          <Typography variant="body1">
            +7(912)-077-04-029
          </Typography>
        </Box>
      </ItemBox>
      <ItemBox>
        <EmailIcon fontSize="large" sx={{ color: '#9370DB', marginRight: 2 }} />
        <Box>
          <Typography variant="h6" component="h3">
            Email:
          </Typography>
          <Typography variant="body1">
            stepan09myromec@gmail.com
          </Typography>
        </Box>
      </ItemBox>
    </StyledBox>
  );
};

export default Contacts;
