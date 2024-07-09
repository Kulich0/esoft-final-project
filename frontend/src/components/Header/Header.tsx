import * as React from 'react';
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle'; 
import { Link, useNavigate } from 'react-router-dom';
import logoround from '../../assets/images/logoround.jpg'; 

interface Props {
  getWindow?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  
  { name: 'Занятия', link: '/classes' },
  { name: 'Расписание', link: '/schedule' },
  { name: 'Прайс', link: '/price' },
];

export default function Header(props: Props) {
  const { getWindow } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [auth, /* setAuth */] = React.useState(true); 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); 
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2 }}>
        <img src={logoround} alt="Гармония движения" style={{ width: '100px', height: '100px', marginTop: '10px'}} /> 
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={item.link}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLoginRedirect}>
            <ListItemText primary="Войти" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = getWindow !== undefined ? () => getWindow().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#9370DB' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component={Link} to="/"
            sx={{
              display: { xs: 'none', sm: 'block' },
              marginRight: 'auto', 
            }}
          >
            <img src={logoround} alt="Гармония движения" style={{ width: '50px', height: '50px', marginTop: '7px' }} /> 
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
            {navItems.map((item) => (
              <Button key={item.name} component={Link} to={item.link} sx={{ color: '#fff', border: 'none' }}>
                {item.name}
              </Button>
            ))}
          </Box>
          <Button variant="outlined" sx={{ color: '#fff', border: '#fff', '&:hover': { border: '#fff' } }} onClick={handleLoginRedirect}>
            Войти
          </Button>
          {auth && (
            <Box sx={{ ml: 'auto' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Профиль</MenuItem>
                <MenuItem onClick={handleClose}>Выход</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }} 
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

