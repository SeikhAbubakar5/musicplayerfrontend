import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const Register = () => {
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const registerUser = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    // Register user
    try {
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const res = await axios.post(`http://localhost:8000/api/user/register`, data);

      if (res.status === 201) {
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while registering user");
      }
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={registerUser}>
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
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Register
          </Typography>
          <TextField
            placeholder="Username"
            value={formData.username}
            onChange={handleInputUpdate}
            name="username"
            margin="normal"
            type={"text"}
            required
          />
          <TextField
            placeholder="Email"
            value={formData.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleInputUpdate}
          />
          <TextField
            placeholder="Password"
            value={formData.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleInputUpdate}
          />
          <TextField
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            name="confirmPassword"
            margin="normal"
            type={"password"}
            required
            onChange={handleInputUpdate}
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already Registered? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
