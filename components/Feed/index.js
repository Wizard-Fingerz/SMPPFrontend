import { Box, Card, CardHeader, CardContent, Typography, Avatar, CardMedia, Button, IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';

const posts = [
  {
    id: 1,
    user: {
      name: 'John J.D. S.',
      avatar: '/john-avatar.jpg',
      title: 'Start-up & Founder Advisor and Venture Builder',
    },
    content: 'Agricultural production is more than sowing seeds...',
    media: {
      type: 'video',
      url: '/river-crabs-video.mp4',
    },
    createdAt: '1h',
    reactions: 120,
    comments: 8,
    shares: 2,
  }, {
    id: 1,
    user: {
      name: 'John J.D. S.',
      avatar: '/john-avatar.jpg',
      title: 'Start-up & Founder Advisor and Venture Builder',
    },
    content: 'Agricultural production is more than sowing seeds...',
    media: {
      type: 'video',
      url: '/river-crabs-video.mp4',
    },
    createdAt: '1h',
    reactions: 120,
    comments: 8,
    shares: 2,
  }, {
    id: 1,
    user: {
      name: 'John J.D. S.',
      avatar: '/john-avatar.jpg',
      title: 'Start-up & Founder Advisor and Venture Builder',
    },
    content: 'Agricultural production is more than sowing seeds...',
    media: {
      type: 'video',
      url: '/river-crabs-video.mp4',
    },
    createdAt: '1h',
    reactions: 120,
    comments: 8,
    shares: 2,
  },
  {
    id: 2,
    user: {
      name: 'SEEMA YADAV',
      avatar: '/seema-avatar.jpg',
      title: 'Science Educator',
    },
    content: 'Innovative farmers have discovered an eco-friendly method...',
    media: {
      type: 'image',
      url: '/crabs-image.jpg',
    },
    createdAt: '3h',
    reactions: 85,
    comments: 15,
    shares: 3,
  },
];

const Feed = () => {
  return (
    <Box>
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
          <CardHeader
            avatar={<Avatar src={post.user.avatar} />}
            title={`${post.user.name} • ${post.user.title}`}
            subheader={post.createdAt}
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
            <Typography variant="body1">{post.content}</Typography>
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
      ))}
    </Box>
  );
};

export default Feed;
