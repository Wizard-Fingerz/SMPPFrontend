import React from 'react';
import { Box, Grid, CssBaseline } from '@mui/material';
import Navbar from '/components/Navbar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <Grid container spacing={4} sx={{ flexGrow: 1, mt: 2}}>
        <Grid item xs={12} md={3} sx={{ padding: 2 }}>
          {children[0]} {/* Left Sidebar */}
        </Grid>
        <Grid item xs={12} md={6} >
          {children[1]} {/* Feed */}
        </Grid>
        <Grid item xs={12} md={3} sx={{ padding: 2 }}>
          {children[2]} {/* Right Sidebar */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
