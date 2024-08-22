import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Importing the Toaster from react-hot-toast
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store";
import { API_BASE_URL } from "../../config";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      
      let res = await axios.post(`http://localhost:8000/api/user/login`, data);

      // console.log("error" ,res)
      if (res.status === 200) {
        toast.success("User logged in successfully"); 
        localStorage.setItem("token", res?.data?.token);
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message); 
      } else {
        toast.error("An error occurred while logging in");
      }
    }
  };

  return (
    <>
      <Toaster /> 
      <form onSubmit={loginUser}>
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
            Login
          </Typography>

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

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
