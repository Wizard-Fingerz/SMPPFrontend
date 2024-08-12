import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Chip,
  RadioGroup,
  FormControlLabel as RadioFormControlLabel,
  Radio
} from '@mui/material';
import logo from '../assets/logo.png';
import Image from 'next/image';
import { API_BASE_URL } from '../utils/constants';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [isBusinessPost, setIsBusinessPost] = useState(false);
  const [isPersonalPost, setIsPersonalPost] = useState(true);
  const [media, setMedia] = useState(null);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [sensitivity, setSensitivity] = useState('low'); // State for sensitivity level
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAllUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleTaggedUsersChange = (event) => {
    const {
      target: { value },
    } = event;
    setTaggedUsers(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    formData.append('url', url);
    formData.append('hashtag', hashtag);
    formData.append('is_business_post', isBusinessPost);
    formData.append('is_personal_post', isPersonalPost);
    formData.append('sensitivity', sensitivity); // Add sensitivity
    formData.append('tagged_users', JSON.stringify(taggedUsers)); // Assuming it's an array of user IDs
    if (media) {
      formData.append('media', media);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/feed/create-post/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post created:', data);
        router.push('/'); // Redirect to the home page or posts list page
      } else {
        const errorData = await response.json();
        console.error('Post creation failed:', errorData);
        setErrors(errorData);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to create post');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 5 }}>
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image src={logo} alt="SMPP Logo" width={120} height={120} />
          <Typography component="h1" variant="h5">
            Create a Post
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" style={{ margin: '10px 0 20px' }}>
            Let your friend get to know more about you!
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="content"
            label="Content"
            name="content"
            autoComplete="content"
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            error={!!errors.content}
            helperText={errors.content ? errors.content[0] : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="url"
            label="URL"
            name="url"
            autoComplete="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={!!errors.url}
            helperText={errors.url ? errors.url[0] : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="hashtag"
            label="Hashtag"
            name="hashtag"
            autoComplete="hashtag"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            error={!!errors.hashtag}
            helperText={errors.hashtag ? errors.hashtag[0] : ''}
          />
          <FormControlLabel
            control={<Switch checked={isBusinessPost} onChange={(e) => setIsBusinessPost(e.target.checked)} />}
            label="Business Post"
          />
          <FormControlLabel
            control={<Switch checked={isPersonalPost} onChange={(e) => setIsPersonalPost(e.target.checked)} />}
            label="Personal Post"
          />
          <FormControl component="fieldset" margin="normal">
            <Typography variant="h6">Sensitivity Level</Typography>
            <RadioGroup
              aria-label="sensitivity"
              name="sensitivity"
              value={sensitivity}
              onChange={(e) => setSensitivity(e.target.value)}
              row
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel value="medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Input
              id="media"
              name="media"
              type="file"
              onChange={(e) => setMedia(e.target.files[0])}
            />
            <FormHelperText>Upload a media file (image, video, etc.)</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="tagged-users-label">Tagged Users</InputLabel>
            <Select
              labelId="tagged-users-label"
              id="tagged-users"
              multiple
              value={taggedUsers}
              onChange={handleTaggedUsersChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {selected.map((userId) => {
                    const user = allUsers.find((u) => u.id === userId);
                    return <Chip key={userId} label={user ? user.first_name : ''} sx={{ margin: '2px' }} />;
                  })}
                </Box>
              )}
            >
              {allUsers.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.first_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Create Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePost;
