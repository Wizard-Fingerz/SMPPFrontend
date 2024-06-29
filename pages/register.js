import React from 'react';
import { Box, Button, Container, TextField, Typography, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import logo from '../assets/logo.png';
import Image from 'next/image';

const RegisterForm = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Image src={logo} alt='SMPP Logo' width={120} height={120} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" style={{ margin: '10px 0 20px' }}>
          Stay updated on your professional world
        </Typography>
        <Box component="form" sx={{ width: '100%', mt: 3 }}>
          <TextField
            fullWidth
            label="Email or phone number"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password (6+ characters)"
            type="password"
            variant="outlined"
            margin="normal"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, mb: 2 }}
          >
            Agree & Join
          </Button>
          <Typography variant="body2" align="center" color="textSecondary">
            or
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            size="large"
            sx={{ mt: 2, mb: 2 }}
          >
            Continue with Google
          </Button>
        </Box>
        <Box mt={2}>
          <Typography variant="body2" align="center">
            Already on SMPP?{' '}
            <Link href="/login" variant="body2">
              Sign in
            </Link>
          </Typography>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Looking to create a page for a business?{' '}
            <Link href="#" variant="body2">
              Get help
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
