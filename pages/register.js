import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import logo from '../assets/logo.png';
import Image from 'next/image';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { API_BASE_URL } from '../utils/constants';

const RegisterForm = () => {
  const [email_or_phone_number, setEmailOrPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine if the input is an email or phone number
    const isEmail = email_or_phone_number.includes('@');
    const regData = isEmail
      ? { email: email_or_phone_number, password }
      : { phone_number: email_or_phone_number, password };

    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Token:', data.token);
        localStorage.setItem('token', data.token);
        router.push('profile-update/');
      } else {
        console.error('Register failed');
        alert('Incorrect Register details.');
      }
    } catch (error) {
      alert('Registration Error, please try again.');
      console.error('Network error:', error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
        <form onSubmit={handleSubmit} style={{ width: '100%', mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email_or_phone_number"
            label="Email or Phone Number"
            name="email_or_phone_number"
            autoComplete="email"
            autoFocus
            value={email_or_phone_number}
            onChange={(e) => setEmailOrPhoneNumber(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, mb: 2 }}
          >
            Agree & Join
          </Button>
        </form>

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
