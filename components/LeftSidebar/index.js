import React, { useContext } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Avatar } from '@mui/material';
import { UserContext } from '../../context/UserContext';  // Adjust the import path

const LeftSidebar = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Typography>Please wait...</Typography>;
  }

  return (
    <Box sx={{ position: 'sticky', top: '70px' }}>
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Avatar
          alt={user.first_name}
          src={user.profile.image || '/assets/profile-avatar.jpg'}
          sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
        />
        <Typography variant="h6">{user.first_name} {user.last_name}</Typography>
        <Typography variant="body2">
          {user.profile.bio}
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Profile viewers" secondary={user.profile.sticker_count} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Post impressions" secondary={user.profile.sticking_count} />
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h6" gutterBottom>
        Recent
      </Typography>
      <List>
        {user.profile.recent_hashtags.map((hashtag, index) => (
          <ListItem key={index}>
            <ListItemText primary={hashtag} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LeftSidebar;
