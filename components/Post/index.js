import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, Avatar, Button, Box, IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';

const Post = ({ post }) => {
  return (
    <Card sx={{ marginBottom: 4, boxShadow: 3, borderRadius: 2 }}>
      <CardHeader
        avatar={<Avatar src={post.user.avatar} />}
        title={post.user.name}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      {post.media && (
        <CardMedia
          component={post.media.type === 'image' ? 'img' : 'video'}
          image={post.media.url}
          alt="Post media"
          controls={post.media.type === 'video'}
          sx={{ height: post.media.type === 'image' ? '200px' : 'auto' }}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          Prepare for your Enterprise Network Assurance Specialist Certification
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Everything you need, all in one place. Get started, get exam-ready, and get Cisco Certified in Enterprise Network Assurance.
        </Typography>
        <Box textAlign='center' sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary">
            Learn more
          </Button>
        </Box>
      </CardContent>
      <Box display="flex" justifyContent="space-between" sx={{ padding: '0 16px 16px' }}>
        <Box display="flex" alignItems="center">
          <ThumbUpAltIcon color="primary" />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {post.reactions}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <CommentIcon color="action" />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {post.comments} Comments
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <ShareIcon color="action" />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {post.shares} Shares
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default Post;
