// AddSong.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button } from '@mui/material';
import toast from 'react-hot-toast';

const AddSong = () => {
  const [songData, setSongData] = useState({
    title: '',
    artist: '',
    filePath: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        toast.error('You must be logged in to add a song');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/songs', songData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });

      toast.success(response.data.message);
      setSongData({
        title: '',
        artist: '',
        filePath: '',
        duration: '',
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred while adding the song');
      console.error('Error:', error);
    }
  };

  return (
    <Box
      maxWidth={450}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginTop={5}
      boxShadow="10px 10px 20px #ccc"
      padding={3}
      borderRadius={5}
    >
      <Typography variant="h4" sx={{ textTransform: 'uppercase' }} padding={3} textAlign="center">
        Add Song
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Title"
          value={songData.title}
          onChange={handleChange}
          name="title"
          margin="normal"
          type="text"
          required
          fullWidth
        />
        <TextField
          placeholder="Artist"
          value={songData.artist}
          onChange={handleChange}
          name="artist"
          margin="normal"
          type="text"
          required
          fullWidth
        />
        <TextField
          placeholder="File Path"
          value={songData.filePath}
          onChange={handleChange}
          name="filePath"
          margin="normal"
          type="text"
          required
          fullWidth
        />
        <TextField
          placeholder="Duration (in seconds)"
          value={songData.duration}
          onChange={handleChange}
          name="duration"
          margin="normal"
          type="number"
          required
          fullWidth
        />
        <Button
          type="submit"
          sx={{ borderRadius: 3, marginTop: 3 }}
          variant="contained"
          color="primary"
        >
          Add Song
        </Button>
      </form>
    </Box>
  );
};

export default AddSong;
