import React from 'react';
import MainPage from './pages/MainPage';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainPage/>
    </BrowserRouter>
  );
};

export default App;
