import React from 'react';
import {Box, SwipeableDrawer, List, ListItem, ListItemButton, 
  ListItemText, Divider, CssBaseline} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListItemIcon from '@mui/material/ListItemIcon';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../reducer/store';
import { fetchUserById } from '../../reducer/slices/userSlice';
import { logout } from '../../reducer/slices/authSlice';


const closedDrawerWidth = 50;
const openDrawerWidth = 240;

const SidebarAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  const DrawerList = (
    <Box sx={{ width: openDrawerWidth, height: '100%', position: 'relative' }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'Главная', icon: <HomeRoundedIcon />, path: '/' },
          { text: 'Профиль', icon: <AccountCircle />, path: `/users/${userId}` },
          { text: 'Мои занятия', icon: <SelfImprovementRoundedIcon />, path: `/class-bookings/users/${userId}` },
          { text: 'Мои абонименты', icon: <FitnessCenterIcon />, path: `/usabonements/users/${userId}` },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: 'Расписание', icon: <DateRangeRoundedIcon />, path: `/profile-schedule/users/${userId}` },
          { text: 'Абонементы', icon: < LocalMallIcon />, path: `/abonements/${userId}` }
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}> 
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Выход" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SwipeableDrawer
        variant="permanent"
        sx={{
          width: isOpen ? openDrawerWidth : closedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isOpen ? openDrawerWidth : closedDrawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: 'width 0.3s',
          },
        }}
        onMouseEnter={toggleDrawer(true)}
        onMouseLeave={toggleDrawer(false)}
        open={isOpen}
      >
        {DrawerList}
      </SwipeableDrawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
      </Box>
    </Box>
  );
};

export default SidebarAccount;

