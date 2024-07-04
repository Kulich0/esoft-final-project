import React, { useState } from 'react';
import { Box, Button, TextField, Card, CardContent, Typography, Link } from '@mui/material';

interface LoginCardProps {
  onLogin: (email: string, password: string, name?: string) => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    onLogin(email, password, name);
  };

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  return (
    <Card sx={{ 
        width: 400, 
        height: isRegistering ? 600 : 500, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: 3, 
        border: '1px solid #9370DB', 
        borderRadius: '8px' }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center', marginBottom: 2 }}>
            {isRegistering ? 'Регистрация' : 'Вход'}
          </Typography>
          {isRegistering && (
            <TextField
              margin="dense"
              id="name"
              label="Имя"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          )}
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Электронная почта"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            id="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box mt={3} display="flex" justifyContent="center">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleLogin} 
              sx={{ 
                backgroundColor: '#9370DB', 
                '&:hover': {
                  backgroundColor: '#7A5DC7',
                }
              }}
            >
              {isRegistering ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </Box>
          {!isRegistering && (
            <Box mt={2}>
              <Typography variant="body2">
                Нет аккаунта? <Link component="button" variant="body2" onClick={handleRegisterClick} sx={{color: '#9370DB', textDecorationColor: '#9370DB'}}>Зарегистрируйтесь</Link>
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginCard;

