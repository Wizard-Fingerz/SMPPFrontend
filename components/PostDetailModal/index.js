import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { API_BASE_URL } from '../../utils/constants';  // Adjust the import path

const PostDetailModal = ({ open, onClose, post }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  if (!post) return null;

  const handleToggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length <= wordLimit) {
      return content;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const truncatedContent = truncateContent(post.content, 30);

  const handleDownload = async (mediaId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/feed/download-media/${mediaId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = 'download';

      if (contentDisposition) {
        const matches = /filename="([^"]*)"/.exec(contentDisposition);
        if (matches && matches[1]) {
          fileName = matches[1];
        }
      }

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Post Details</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">{post.user.name}</Typography>
        <Typography variant="subtitle1">{post.user.title}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {showFullContent ? post.content : truncatedContent}
          <Button onClick={handleToggleContent} sx={{ ml: 1 }}>
            {showFullContent ? 'See less' : 'See more'}
          </Button>
        </Typography>

        {post.media && post.media.map((media, index) => {
          const isImage = media.file && media.file.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/);
          const isVideo = media.file && media.file.toLowerCase().match(/\.(mp4|mov|webm|ogg)$/);

          return (
            <div key={index} style={{ marginTop: '16px' }}>
              {isImage ? (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 'auto',
                    paddingBottom: '56.25%', // Maintain 16:9 aspect ratio
                    backgroundColor: '#f0f0f0', // Background color to show while loading
                  }}
                >
                  <Image
                    src={media.file}
                    alt="Post media"
                    layout="fill"
                    objectFit="contain"
                    onError={(e) => {
                      console.error('Image failed to load', e);
                      console.log(`Failed image URL: ${media.file}`);
                    }}
                  />
                </Box>
              ) : isVideo ? (
                <video
                  src={media.file}
                  controls
                  style={{ width: '100%', height: 'auto' }}
                  onError={(e) => {
                    console.error('Video failed to load', e);
                    console.log(`Failed video URL: ${media.file}`);
                  }}
                  onContextMenu={(e) => e.preventDefault()} // Disable right-click context menu
                />
              ) : (
                <Typography variant="body2" color="error">
                  Unsupported media type: {media.file ? media.file.split('.').pop() : 'unknown'}
                </Typography>
              )}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleDownload(media.id)}
                sx={{ mt: 2 }}
              >
                Download {isImage ? 'Image' : 'Video'}
              </Button>
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailModal;
