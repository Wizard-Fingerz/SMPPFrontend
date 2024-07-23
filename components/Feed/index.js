import React, { useState, useEffect } from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Avatar, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import PostDetailModal from '../PostDetailModal'; // Import the PostDetailModal component
import { API_BASE_URL } from '../../utils/constants';  // Adjust the import path
import { format } from 'date-fns';  // Import date-fns
import Image from 'next/image';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState({}); // State to manage expanded posts

  useEffect(() => {
    fetch(`${API_BASE_URL}/feed/post-feeds`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched posts data:', data); // Log the data to check if media is included
        setPosts(data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleToggleContent = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length <= wordLimit) {
      return content;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid Date'; // Handle invalid dates
    }
    return format(date, 'MMMM d, yyyy h:mm a');
  };

  if (!Array.isArray(posts)) {
    return <div></div>;
  }

  return (
    <Box>
      {posts.map((post) => {
        const isExpanded = expandedPosts[post.id];
        const truncatedContent = truncateContent(post.content, 30);

        return (
          <Card key={post.id} sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
              avatar={<Avatar src={post.user.avatar} />}
              title={`${post.user.first_name} ${post.user.last_name}`}
              subheader={formatDate(post.timestamp)} // Format the timestamp
            />
            {post.media && post.media.map((media, index) => {
              const isImage = media.file && media.file.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/);
              const isVideo = media.file && media.file.toLowerCase().match(/\.(mp4|mov|webm|ogg)$/);

              return (
                <div key={index}>
                  {isImage ? (
                    <div style={{ position: 'relative', width: '100%', height: 'auto', overflow: 'hidden' }}>
                    <Image
                      src={media.file}
                      alt="Post media"
                      layout="fill" // Make the image fill the container
                      objectFit="cover" // Adjust the image to cover the container
                      onError={(e) => {
                        console.error('Image failed to load', e);
                        console.log(`Failed image URL: ${media.file}`);
                      }}
                    />
                  </div>
                  ) : isVideo ? (
                    <video
                      src={media.file}
                      controls
                      style={{ width: '100%', height: 'auto' }}
                      onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
                      onError={(e) => {
                        console.error('Video failed to load', e);
                        console.log(`Failed video URL: ${media.file}`);
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="error">
                      Unsupported media type: {media.file ? media.file.split('.').pop() : 'unknown'}
                    </Typography>
                  )}
                </div>
              );
            })}

            <CardContent>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {isExpanded ? post.content : truncatedContent}
                <Button onClick={() => handleToggleContent(post.id)} sx={{ ml: 1 }}>
                  {isExpanded ? 'See less' : 'See more'}
                </Button>
              </Typography>

              <Typography variant="body1" color='blue'>{post.hashtag}</Typography>
              <Typography variant="body1" color='blue'>{post.url}</Typography>
            </CardContent>
            <Box display="flex" justifyContent="space-between" sx={{ padding: '0 16px 16px' }}>
              <Box display="flex" alignItems="center">
                <ThumbUpAltIcon color="primary" />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  {post.reaction ? post.reaction.count : 0}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <CommentIcon color="action" />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  {post.comments ? post.comments.length : 0}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <ShareIcon color="action" />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  {post.shares ? post.shares.length : 0}
                </Typography>
              </Box>
              <Button onClick={() => handleOpenModal(post)} variant="outlined" sx={{ mt: 2 }}>
                View Details
              </Button>
            </Box>
          </Card>
        );
      })}
      {selectedPost && (
        <PostDetailModal open={modalOpen} onClose={handleCloseModal} post={selectedPost} />
      )}
    </Box>
  );
};

export default Feed;
