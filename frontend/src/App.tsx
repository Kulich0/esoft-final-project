import React, { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from './reducer/slices/userSlice';
import { RootState, AppDispatch } from './reducer/store';
import { setUser, setAccessToken } from './reducer/slices/authSlice';

const App: React.FC = () => {
/*   const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user?.id);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      dispatch(setAccessToken(token));
      dispatch(setUser(JSON.parse(user))); 
    }

    if (token && userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);
 */
  return <AppRouter />;
};

export default App;
