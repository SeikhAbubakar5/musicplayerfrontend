import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import toast from "react-hot-toast";

const Createplaylist = () => {
  const [formData, setFormData] = useState({
    name: "",
    songs: [],
  });

  const [allSongs, setAllSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token
        if (!token) {
          toast.error("You must be logged in to fetch songs");
          setLoading(false);
          return;
        }
        const response = await axios.get(`http://localhost:8000/api/songs`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setAllSongs(response.data); // Adjust based on your actual response structure
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch songs");
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSongChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      songs: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Retrieve the token
      if (!token) {
        toast.error("You must be logged in to create a playlist");
        return;
      }
      const response = await axios.post(`http://localhost:8000/api/playlists`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      toast.success(response.data.message);
      setFormData({
        name: "",
        songs: [],
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred while creating the playlist");
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      maxWidth={450}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent={"center"}
      margin="auto"
      marginTop={5}
      boxShadow="10px 10px 20px #ccc"
      padding={3}
      borderRadius={5}
    >
      <Typography variant="h4" sx={{ textTransform: "uppercase" }} padding={3} textAlign="center">
        Create Playlist
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Playlist Name"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
          margin="normal"
          type={"text"}
          required
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="song-select-label">Select Songs</InputLabel>
          <Select
            labelId="song-select-label"
            multiple
            value={formData.songs}
            onChange={handleSongChange}
            name="songs"
            renderValue={(selected) => selected.join(", ")}
          >
            {allSongs.map((song) => (
              <MenuItem key={song._id} value={song._id}>
                {song.title} {/* Adjust based on your song properties */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" sx={{ borderRadius: 3, marginTop: 3 }} variant="contained" color="primary">
          Create Playlist
        </Button>
      </form>
    </Box>
  );
};

export default Createplaylist;
