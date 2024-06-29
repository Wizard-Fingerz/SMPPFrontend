import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Modal, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PostCard = ({ post }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Card onClick={handleOpen} sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={post.image}
          alt={post.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {post.title}
          </Typography>
          <CardMedia
            component="img"
            height="200"
            image={post.image}
            alt={post.title}
            sx={{ mt: 2 }}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {post.description}
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained" color="primary">Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default PostCard;
