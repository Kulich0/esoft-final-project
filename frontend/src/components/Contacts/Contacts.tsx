import React from 'react';
import { Typography, Box } from '@mui/material';

const Contacts: React.FC = () => {
  return (
    <Box sx={{ 
      padding: 4, 
      backgroundColor: '#fff', 
      maxWidth: '100%', 
      margin: '0 auto', 
      textAlign: 'left' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Контакты
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Адрес:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Тюмень, Спасская улица, 14
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Телефон:
      </Typography>
      <Typography variant="body1" gutterBottom>
      +7(912)-077-04-029
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Email:
      </Typography>
      <Typography variant="body1" gutterBottom>
        stepan09myromec@gmail.com
      </Typography>
    </Box>
  );
};

export default Contacts;
