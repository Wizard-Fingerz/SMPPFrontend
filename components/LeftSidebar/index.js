import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Avatar } from '@mui/material';

const LeftSidebar = () => {
  return (
    <Box sx={{ position: 'sticky', top: '70px' }}>
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Avatar
          alt="Adewale Oladiti"
          src="/assets/profile-avatar.jpg"
          sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
        />
        <Typography variant="h6">Adewale Oladiti</Typography>
        <Typography variant="body2">
          Software Engineer | Backend Engineer (Django) | GDSC FTU Web lead | Tech U NACOS President | Founder of ETL COMMUNITY | Content Creator and Researcher.
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Profile viewers" secondary="34" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Post impressions" secondary="57" />
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h6" gutterBottom>
        Recent
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="#agrictech" />
        </ListItem>
        <ListItem>
          <ListItemText primary="#visualdata" />
        </ListItem>
        <ListItem>
          <ListItemText primary="#automatedweedmanagement" />
        </ListItem>
        <ListItem>
          <ListItemText primary="#fruit Import and export" />
        </ListItem>
        <ListItem>
          <ListItemText primary="#Africa Trading Platform" />
        </ListItem>
      </List>
    </Box>
  );
};

export default LeftSidebar;
