import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../reducer/store';
import { fetchUserById, updateUser } from '../../reducer/slices/userSlice';

export default function CardAccount() {
  const dispatch: AppDispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  const [editing, setEditing] = React.useState(false);
  const [tempUser, setTempUser] = React.useState({
    id: '',
    name: '',
    email: '',
    password: '',
  });

  const userId = useSelector((state: RootState) => state.auth.user?.id);

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  React.useEffect(() => {
    if (user) {
      setTempUser({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateUser({ id: tempUser.id, updatedUser: tempUser }))
      .then(() => {
        setEditing(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {typeof error === 'object' ? JSON.stringify(error) : error}</div>;

  return (
    <Card sx={{ maxWidth: 745, marginLeft: '320px' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ mr: 2 }} />
          {editing ? (
            <TextField
              variant="outlined"
              name="name"
              label="Имя"
              value={tempUser.name}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              {tempUser.name}
            </Typography>
          )}
        </Box>
        {editing ? (
          <>
            <TextField
              variant="outlined"
              name="email"
              label="Email"
              value={tempUser.email}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              name="password"
              label="Password"
              type="password"
              value={tempUser.password}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              sx={{ 
                bgcolor: '#9370DB',
                '&:hover': { backgroundColor: '#7A5DC7' },
              }}
              onClick={handleSave}
            >
              Сохранить
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong> {tempUser.email}
            </Typography>
            <Button
              variant="contained"
              sx={{ 
                bgcolor: '#9370DB',
                marginTop: '25px', 
                '&:hover': { backgroundColor: '#7A5DC7' },
              }}
              onClick={handleEdit}
            >
              Редактировать
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
