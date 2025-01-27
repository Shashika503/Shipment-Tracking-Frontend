import axios from "axios";

const API_BASE = "http://localhost:8080/api"; // Adjust as per your backend URL

// Customer Registration
export const registerCustomer = async (customerData) => {
  const ResponseMessage =  axios.post(`${API_BASE}/customers/register`, customerData);
  return ResponseMessage;
};

export const handleLogout = () => {
  localStorage.removeItem("isAuthenticated"); // Clear authentication flag
  window.location.href = "/login"; // Redirect to login page
};

// Customer Login
export const loginCustomer = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE}/customers/login`, loginData);
    return response.data; // Return structured data with status and message
  } catch (error) {
    throw error.response?.data || { status: 500, message: "Server error" };
  }
};