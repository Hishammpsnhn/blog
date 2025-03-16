import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getPost } from "../../action/postAction";
import Header from "../components/Header";

export const BlogDetailPage = () => {
  const { id } = useParams();
  const [BlogDetails, setBlogDetails] = useState(null);

  useEffect(() => {
    if (id) {
      console.log(id);
      const fetchBlog = async () => {
        const res = await getPost(id);
        if (res.success) {
          setBlogDetails(res.post);
        }
      };
      fetchBlog();
    }
  }, [id]);

  return (
    <>
      <Header />
      {!BlogDetails ? (
        <CircularProgress />
      ) : (
        <Container maxWidth="md">
          <Box my={4}>
            <Paper elevation={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="400"
                  image={BlogDetails?.image}
                  alt={BlogDetails?.title}
                />
              </Card>

              <Box p={4}>
                {/* <Typography variant="overline" color="textSecondary">
                {format(blog.date, 'MMMM dd, yyyy')}
              </Typography> */}

                <Typography variant="h3" component="h1" gutterBottom>
                  {BlogDetails?.title}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="body1" paragraph>
                  {BlogDetails?.desc}
                </Typography>

                {/* Content would continue here */}
                <Typography variant="body1" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                  dolor auctor. Donec ullamcorper nulla non metus auctor
                  fringilla. Vestibulum id ligula porta felis euismod semper.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
      )}
    </>
  );
};
