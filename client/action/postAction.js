import axios from "axios";

axios.defaults.withCredentials = true;
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllPost = async () => {
  try {
    const { data } = await axios.get(
      `${apiUrl}/api/post`,
      { withCredentials: true }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const createPost = async (postData) => {
  try {
    const { data } = await axios.post(
      `${apiUrl}/api/post`,
      postData
    );

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getPost = async (id) => {
  try {
    const { data } = await axios.get(
      `${apiUrl}/api/post/${id}`,
      { withCredentials: true }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await axios.delete(
      `${apiUrl}/api/post/${id}`,
      { withCredentials: true }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updatePost = async (id) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/api/post/${id}`,
      { withCredentials: true }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
