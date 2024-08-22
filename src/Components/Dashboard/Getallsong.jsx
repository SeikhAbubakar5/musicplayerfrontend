import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import MusicPlayer from '../Dashboard/Musicplayer';

const Getallsong = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8000/api/songs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSongs(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch songs');
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleSongClick = (song) => {
    setSelectedSong(song);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      {selectedSong && <MusicPlayer songUrl={selectedSong.filePath} songTitle={selectedSong.title} />}
      <Typography variant="h4" sx={{ textTransform: 'uppercase' }} padding={3} textAlign="center">
        All Songs
      </Typography>
      <List>
        {songs.map((song) => (
          <ListItem button key={song._id} onClick={() => handleSongClick(song)}>
            <ListItemText
              primary={song.title}
              secondary={`Artist: ${song.artist}, Duration: ${song.duration} seconds`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Getallsong;
