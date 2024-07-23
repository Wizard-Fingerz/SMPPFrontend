import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Post from '../components/Post';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch profile and posts from backend
    const fetchProfileAndPosts = async () => {
      const profileResponse = await fetch('/api/profile');
      const profileData = await profileResponse.json();
      setProfile(profileData);

      const postsResponse = await fetch(`/api/posts?user=${profileData.id}`);
      const postsData = await postsResponse.json();
      setPosts(postsData);
    };
    fetchProfileAndPosts();
  }, []);

  if (!profile) {
    return <Box></Box>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        {profile.name}&apos;s Profile
      </Typography>
      {/* Display user profile information */}
      <Typography variant="body1" component="p">
        {profile.bio}
      </Typography>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Container>
  );
};

export default Profile;
