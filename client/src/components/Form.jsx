import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Header from "./Header";
import axios from "axios";
import { createPost, getPost, updatePost } from "../../action/postAction";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  desc: "",
  imageUrl: "",
  imageName: "",
};

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    title: false,
    desc: false,
    image: false,
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setErrors({ ...errors, image: true });
      return;
    }

    setUploading(true);

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "olx_clone_ts");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dhs8o9scz/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        }
      );

      setFormData((prev) => ({
        ...prev,
        imageUrl: response.data.secure_url,
        imageName: file.title,
      }));
      setErrors({ ...errors, image: false });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      setErrors({ ...errors, image: true });
    } finally {
      setUploading(false);
    }
  };
console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: formData.title.trim() === "",
      desc: formData.desc.trim() === "",
      image: formData.imageUrl === "",
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      setLoading(true);
      try {
        if (id) {
          console.log(formData);
          const res = await updatePost(id, formData);
          console.log(res);
          if (res.success) {
            setFormData(initialState);
            navigate("/");
          }
        } else {
          const res = await createPost(formData);
          if (res.success) {
            setFormData(initialState);
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const res = await getPost(id);
        if (res.success) {
          setFormData({ ...res.post, imageUrl: res.post.image });
        }
      };
      fetchBlog();
    }
  }, [id]);

  return (
    <>
      <Header />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "70%",
          mx: "auto",
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        {formData.imageUrl ? (
          <Box display="flex" alignItems="center" gap={2}>
            <img
              src={formData.imageUrl}
              alt="Uploaded"
              style={{
                width: "25%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginTop: "10px",
              }}
            />
            {id && (
              <Button
                variant="outlined"
                component="label"
                sx={{ mt: 2, mb: 2 }}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Change"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
            )}
          </Box>
        ) : (
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2, mb: 2 }}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add a Cover Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>
        )}

        {/* Title Input */}
        <TextField
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          helperText={errors.title && "Title is required"}
          fullWidth
          margin="normal"
          variant="standard"
          placeholder="New Post title here..."
          InputProps={{
            fontFamily: "'Roboto Mono', monospace",
            sx: {
              fontSize: "2.5rem",
              color: "black",
              "& input::placeholder": { color: "#464a5b", opacity: 1 },
            },
            disableUnderline: true,
          }}
        />

        {/* Description Input */}
        <TextField
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          error={errors.desc}
          helperText={errors.desc && "Description is required"}
          fullWidth
          multiline
          rows={12}
          margin="normal"
          variant="standard"
          placeholder="Write your post content here..."
          InputProps={{
            fontFamily: "'Roboto Mono', monospace",
            sx: {
              bgcolor: "ghostwhite",
              fontSize: "1.4rem",
              padding: 2,
              color: "black",
              "& input::placeholder": { color: "#464a5b", opacity: 1 },
            },
            disableUnderline: true,
          }}
        />

        {errors.image && (
          <Typography color="error" sx={{ mb: 2 }}>
            Please upload an image.
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </Box>
    </>
  );
};

export default Form;
