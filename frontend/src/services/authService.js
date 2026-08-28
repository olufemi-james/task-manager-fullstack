import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}/forgot-password`,
    { email }
  );
  return response.data;
};

const resetPassword = async (token, password) => {
  const response = await axios.post(
    `${API_URL}/reset-password/${token}`,
    { password }
  );
  return response.data;
};

const authService = {
  login,
  register,
  forgotPassword,
  resetPassword,
};

export default authService;