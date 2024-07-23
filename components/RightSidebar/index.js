import React, { useContext } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import Image from 'next/image';
import { UserContext } from '../../context/UserContext';  // Adjust the import path
import logo from '/assets/logo.png';

const RightSidebar = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ position: 'sticky', top: '70px' }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">
            {user.first_name}, share what's on your mind with others.
          </Typography>
          <Button href='create-post/' variant="contained" color="primary" fullWidth>
            Create post
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Get the SMPP Windows App</Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Image src={logo} alt="SMPP Logo" width={120} height={120} />
        </Box>
      </Card>
    </Box>
  );
};

export default RightSidebar;
