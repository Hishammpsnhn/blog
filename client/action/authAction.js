import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (formData) => {
  try {
    const { data } = await axios.post(`${apiUrl}/api/auth/login`,  formData );
    return data
  } catch (error) {
    console.error(error)
  }
};
export const signup = async (formData) => {
  try {
    const { data } = await axios.post(`${apiUrl}/api/auth/signup`,  formData );
    return data
  } catch (error) {
    console.error(error)
  }
};
