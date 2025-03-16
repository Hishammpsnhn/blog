import axios from "axios";

axios.defaults.withCredentials = true;
const apiUrl = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllPost = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/post`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const createPost = async (postData) => {
  try {
    const { data } = await axios.post(`${apiUrl}/api/post`, postData, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getPost = async (id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/post/${id}`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/api/post/${id}`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updatePost = async (id, updatedData) => {
  try {
    const { data } = await axios.put(`${apiUrl}/api/post/${id}`, updatedData, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
