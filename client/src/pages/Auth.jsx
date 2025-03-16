import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../action/authAction";
import { AuthContext } from "../components/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { loginSchema } from "../../utils/validation";

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(null);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      await loginSchema.validate(loginData);

      const res = await login(loginData);
      console.log(res);
      if (res.success) {
        const { user, token } = res;
        const decoded = jwtDecode(token);
        setUser(decoded);
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
      } else {
        setError(res.message);
      }
    } catch (err) {
      console.log(err);
      if (err.name === "ValidationError") {
        setError(err.message);
      }
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      if (signupData.password !== signupData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await loginSchema.validate({
        email: signupData.email,
        password: signupData.password,
      });

      const res = await signup(signupData);
      if (res?.success) {
        const { user, token } = res;
        const decoded = jwtDecode(token);
        setUser(decoded);
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");
      } else {
        setError(res.message);
      }
    } catch (err) {
      console.log(err);
      if (err.name === "ValidationError") {
        setError(err.message);
      }
      console.error("Signup Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {activeTab === 0 && (
          <Box mt={3}>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLoginSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    {loading ? <CircularProgress size={25} /> : "Login"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}

        {activeTab === 1 && (
          <Box mt={3}>
            <Typography variant="h5" align="center" gutterBottom>
              Signup
            </Typography>
            <form onSubmit={handleSignupSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    type="text"
                    fullWidth
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    error={
                      signupData.password !== signupData.confirmPassword &&
                      signupData.confirmPassword !== ""
                    }
                    helperText={
                      signupData.password !== signupData.confirmPassword &&
                      signupData.confirmPassword !== ""
                        ? "Passwords do not match"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    {loading ? <CircularProgress size={20} /> : "Signup"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AuthPage;
