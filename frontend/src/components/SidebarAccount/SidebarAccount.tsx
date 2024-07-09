import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../reducer/store';
import { fetchUserById } from '../../reducer/slices/userSlice'; 

const drawerWidth = 250;

const SidebarAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  const DrawerList = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <List>
        {[
          { text: 'Профиль', icon: <AccountCircle/>, path: `/users/${userId}` },
          { text: 'Мои занятия', icon: <SelfImprovementRoundedIcon/>, path: 'my-classes' }
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
          { text: 'Расписание', icon: <DateRangeRoundedIcon />, path: `/profile-schedule/users/${userId}` }
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="persistent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        open
      >
        {DrawerList}
      </Drawer>
      <Box
        component="main"
        sx={{ p: 3 }}
      >
      </Box>
    </Box>
  );
}

export default SidebarAccount;
