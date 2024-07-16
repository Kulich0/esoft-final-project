import * as React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#9370DB',
        color: '#fff',
        paddingTop: '20px',
        paddingBottom: '20px',
        
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              О центре
            </Typography>
            <Typography variant="body2">
              Гармония движения - это центр йоги и здоровья. Мы предлагаем различные занятия для улучшения вашего здоровья и настроения.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Навигация
            </Typography>
            <Link href="/about" color="inherit" variant="body2" display="block" sx = {{textDecoration: 'none'}}>
              О центре
            </Link>
            <Link href="/classes" color="inherit" variant="body2" display="block" sx = {{textDecoration: 'none'}}>
              Занятия
            </Link>
            <Link href="/schedule" color="inherit" variant="body2" display="block" sx = {{textDecoration: 'none'}}>
              Расписание
            </Link>
            <Link href="/price" color="inherit" variant="body2" display="block" sx = {{textDecoration: 'none'}}>
              Прайс
            </Link>
            <Link href="/contacts" color="inherit" variant="body2" display="block" sx = {{textDecoration: 'none'}}>
              Контакты
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Контакты
            </Typography>
            <Typography variant="body2">
              Адрес: Спасская улица, 14
            </Typography>
            <Typography variant="body2">
              <a href='tel:+791207704029' style={{color: 'inherit', textDecoration: 'none'}}>
              Телефон: +7(912)-077-04-029
              </a>
            </Typography>
            <Typography variant="body2">
              Email: stepan09myromec@gmail.com
            </Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={2}>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
