import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Box, Grid } from "@mui/material";
import Header from "../components/Header";
import { getAllPost, deletePost } from "../../action/postAction"; // Ensure deletePost is imported

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const handleDelete = async (id) => {
    
    const res = await deletePost(id);
    console.log(res)
    if (res.success) {
      console.log("goint to be delete")
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id != id));
    }
  };

  useEffect(() => {
    async function getBlogs() {
      const res = await getAllPost();
      if (res.success) {
        setBlogs(res.posts);
      }
    }
    getBlogs();
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ px: 2, py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="stretch">
              {blogs.map((item) => (
                <Grid item xs={12} sm={6} md={2} key={item._id}>
                  <BlogCard
                    author={item.author}
                    desc={item.desc}
                    title={item.title}
                    id={item._id}
                    image={item.image}
                    handleDelete={() => handleDelete(item._id)} 
                  />
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

