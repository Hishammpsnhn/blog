import { Paper, Typography, Box, Button } from "@mui/material";
import React, { useContext } from "react";
import MemoryIcon from "@mui/icons-material/Memory";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "white",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left Section: Icon and Title */}
      <Box display="flex" alignItems="center" gap={2}>
        <MemoryIcon sx={{ fontSize: 40 }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Memories
        </Typography>
      </Box>

      {/* Right Section: Subtitle */}
      <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
        Capture and cherish your moments
      </Typography>
      <Box display="flex" gap={5}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => navigate("/new")}
          sx={{
            padding: 1,
          }}
        >
          Create Post
        </Button>
        {user ? (
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{
              padding: 1,
            }}
          >
            LOGOUT
          </Button>
        ) : (
          <Button
            variant="contained"
            color="info"
            onClick={()=> navigate('/auth')}
            sx={{
              padding: 1,
            }}
          >
            LOGIN
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default Header;
