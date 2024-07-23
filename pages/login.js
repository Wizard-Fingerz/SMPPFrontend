import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import logo from '../assets/logo.png';
import Image from 'next/image';
import { API_BASE_URL } from './constants';

const Login = () => {
  const [email_or_username, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Prepare the login data
    const formData = new FormData();
    formData.append('username', email_or_username);
    formData.append('password', password);

    // Send a POST request to your Django API endpoint
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Display the token in the console
        console.log('Token:', data.token);
        // Save the token to the local storage
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        // Handle login failure
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert('Incorrect Login details.');
      }
    } catch (error) {
      // Handle network or request error
      alert('Login Error, please try again.');
      console.error('Network error:', error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image src={logo} alt='SMPP Logo' width={120} height={120} />

        <Typography component="h1" variant="h5">
          Sign in
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
            id="email"
            label="Email or Phone Number"
            name="email"
            autoComplete="email"
            autoFocus
            value={email_or_username}
            onChange={(e) => setEmailOrUsername(e.target.value)}
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
          <Link href="#" variant="body2" style={{ display: 'block', textAlign: 'right', marginBottom: '20px' }}>
            Forgot password?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '10px 0 20px' }}
          >
            Sign in
          </Button>
          <Divider>or</Divider>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            style={{ margin: '20px 0 10px' }}
          >
            Continue with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AppleIcon />}
            style={{ marginBottom: '20px' }}
          >
            Sign in with Apple
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            New to SMPP? <Link href="/register">Join now</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
