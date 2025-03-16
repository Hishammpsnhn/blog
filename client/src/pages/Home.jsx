import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Box, CircularProgress, Grid } from "@mui/material";
import Header from "../components/Header";
import { getAllPost, deletePost } from "../../action/postAction";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    const res = await deletePost(id);
    if (res.success) {
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    }
  };

  useEffect(() => {
    async function getBlogs() {
      setLoading(true);
      try {
        const res = await getAllPost();
        if (res.success) {
          setBlogs(res.posts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getBlogs();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <Box >
          {" "}
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ px: 2, py: 3 }}>
          <Grid container spacing={3}>
            {blogs.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <BlogCard
                  author={item.author}
                  desc={item.desc}
                  title={item.title}
                  id={item._id}
                  image={item.image}
                  createdAt={item.createdAt}
                  handleDelete={() => handleDelete(item._id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Home;
