import React from 'react';
import AppRouter from './router/AppRouter';
import useAuthInit from './hooks/useAuthInit';

const App: React.FC = () => {
  useAuthInit();

  return <AppRouter />;
};

export default App;
