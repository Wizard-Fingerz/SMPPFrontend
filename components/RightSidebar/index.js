import React from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar } from '@mui/material';
import logo from '/assets/logo.png';
import Image from 'next/image';

const RightSidebar = () => {
  return (
    <Box sx={{ position: 'sticky', top: '70px' }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">
            Adewale, candidates are ready when you are.
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Start job post
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
