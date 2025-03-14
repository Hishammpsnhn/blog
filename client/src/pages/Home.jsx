import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import Form from "../components/Form";
import { Box, Grid, Button, Modal, Typography } from "@mui/material";
import Header from "../components/Header";

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header />
      <Box sx={{ px: 2, py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="stretch">
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item}>
                  <BlogCard />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
