import React, { useState } from "react";
import { loginCustomer } from "../../services/customerService";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
} from "@mui/material";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginCustomer(loginData); // Call the login API

      if (data.status === 200) {
        toast.success(data.message, { autoClose: 5000 });// Show success message
        // Store authentication flag in localStorage
        localStorage.setItem("isAuthenticated", true);

        // Redirect to tracking page
        window.location.href = "/track";
        // Optionally, store the customerId for future use
        localStorage.setItem("customerId", data.customerId);
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      toast.error(errorMessage); // Show error message
    }
  };


  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Customer Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
