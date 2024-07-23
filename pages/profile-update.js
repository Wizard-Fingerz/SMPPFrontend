import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Grid, Container, MenuItem, Avatar } from '@mui/material';
import logo from '../assets/logo.png';
import Image from 'next/image';
import { API_BASE_URL } from '../utils/constants';
import { useRouter } from 'next/router';

const RELIGION_CHOICES = [
  { value: 'Christianity', label: 'Christianity' },
  { value: 'Muslim', label: 'Muslim' },
  { value: 'Indigenous', label: 'Indigenous' },
  { value: 'Others', label: 'Others' },
];

const UserProfileForm = () => {
  const [userProfile, setUserProfile] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    profile: {
      work: '',
      date_of_birth: '',
      gender: '',
      custom_gender: '',
      religion: '',
      address: {
        current_city: '',
      },
    },
  });

  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const router = useRouter();


  useEffect(() => {
    // Fetch the user profile data

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    let updatedProfile = { ...userProfile };

    if (keys.length === 1) {
      updatedProfile[keys[0]] = value;
    } else if (keys.length === 2) {
      updatedProfile[keys[0]][keys[1]] = value;
    } else if (keys.length === 3) {
      updatedProfile[keys[0]][keys[1]][keys[2]] = value;
    }

    setUserProfile(updatedProfile);
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === 'profile_image') {
      setSelectedProfileImage(file);
    } else if (name === 'cover_image') {
      setSelectedCoverImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user.first_name', userProfile.first_name);
    formData.append('user.last_name', userProfile.last_name);
    formData.append('work', userProfile.profile.work);
    formData.append('date_of_birth', userProfile.profile.date_of_birth);
    formData.append('identity', userProfile.profile.gender);
    formData.append('custom_gender', userProfile.profile.custom_gender);
    formData.append('religion', userProfile.profile.religion);
    formData.append('profile_image', selectedProfileImage);
    formData.append('cover_image', selectedCoverImage);

    try {
      const response = await fetch(`${API_BASE_URL}/user-profile/update/`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        router.push('/'); // Redirect to the home page or posts list page
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image src={logo} alt="SMPP Logo" width={120} height={120} />
        <Typography component="h1" variant="h5">
          Create Profile
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" style={{ margin: '10px 0 20px' }}>
          Stay updated on your professional world
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={userProfile.first_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={userProfile.last_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={userProfile.username}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={userProfile.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Work"
              name="profile.work"
              value={userProfile.profile.work}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="profile.date_of_birth"
              value={userProfile.profile.date_of_birth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Gender"
              name="profile.gender"
              value={userProfile.profile.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </TextField>
          </Grid>
          {userProfile.profile.gender === 'custom' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Custom Gender"
                name="profile.custom_gender"
                value={userProfile.profile.custom_gender}
                onChange={handleChange}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Religion"
              name="profile.religion"
              value={userProfile.profile.religion}
              onChange={handleChange}
            >
              {RELIGION_CHOICES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
            >
              Upload Profile Image
              <input
                type="file"
                name="profile_image"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {selectedProfileImage && (
              <Avatar
                src={URL.createObjectURL(selectedProfileImage)}
                alt="Profile Image"
                sx={{ width: 100, height: 100, mt: 2 }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
            >
              Upload Cover Image
              <input
                type="file"
                name="cover_image"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {selectedCoverImage && (
              <Avatar
                src={URL.createObjectURL(selectedCoverImage)}
                alt="Cover Image"
                sx={{ width: 100, height: 100, mt: 2 }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserProfileForm;
