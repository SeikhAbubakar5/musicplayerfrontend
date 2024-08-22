// MusicPlayer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const MusicPlayer = ({ songUrl, songTitle }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="auto"
      marginTop={5}
      padding={3}
      boxShadow="10px 10px 20px #ccc"
      borderRadius={5}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Now Playing: {songTitle}
      </Typography>
      <audio controls autoPlay>
        <source src={songUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default MusicPlayer;
