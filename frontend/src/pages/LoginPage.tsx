import React from 'react';
import LoginCard from '../components/Card/LoginCard';
import { Box } from '@mui/material';

const LoginPage: React.FC = () => {
    const handleLogin = (email: string, password: string, name?: string) => {
        console.log(`Email: ${email}, Password: ${password}, Name: ${name}`);
        
      };
    
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <LoginCard onLogin={handleLogin} />
        </Box>
      );
    };

export default LoginPage;