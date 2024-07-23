import React, { useState, useContext } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, InputBase, Box, Avatar,
  Drawer, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '/assets/logo.png';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import { UserContext } from '../../context/UserContext';  // Adjust the import path
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!user) {
    return <Box></Box>;
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Home', 'My Network', 'Jobs', 'Messaging', 'Notifications'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 && <HomeIcon />}
              {index === 1 && <PeopleIcon />}
              {index === 2 && <WorkIcon />}
              {index === 3 && <ChatIcon />}
              {index === 4 && <NotificationsIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="default" sx={{ borderBottom: '1px solid #ddd' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image src={logo} alt="SMPP Logo" width={30} height={30} />
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <SearchIcon />
              <InputBase
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ ml: 1, flex: 1 }}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-around' }}>
          {!isMobile ? (
            <>
              <div>
                <IconButton color="inherit">
                  <HomeIcon />
                </IconButton>
                <div>Home</div>
              </div>
              <div>
                <IconButton color="inherit">
                  <PeopleIcon />
                </IconButton>
                <div>My Network</div>
              </div>
              <div>
                <IconButton color="inherit">
                  <WorkIcon />
                </IconButton>
                <div>Job</div>
              </div>
              <div>
                <IconButton color="inherit">
                  <ChatIcon />
                </IconButton>
                <div>Chat</div>
              </div>
              <div>
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
                <div>Notification</div>
              </div>
            </>
          ) : (
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={user.first_name}
            src={user.profile.image || '/assets/profile-avatar.jpg'}
          />
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
