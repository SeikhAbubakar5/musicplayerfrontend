import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { API_BASE_URL } from "../../config"; //my backend deployment link showing error so i use localhost url

const Allplaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
       
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/playlists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaylists(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch playlists");
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        All Playlists
      </Typography>
      <List>
        {playlists.length === 0 ? (
          <Typography>No playlists available</Typography>
        ) : (
          playlists.map((playlist) => (
            <ListItem key={playlist._id}>
              <ListItemText
                primary={playlist.name}
                secondary={`Songs: ${playlist.songs.length}`}
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default Allplaylist;
