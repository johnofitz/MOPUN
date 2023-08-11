// Import the axios library for making HTTP requests
import axios from "axios";

// Define the base URL for the API
const API_URL = "https://localhost:7056/api/Login/";

// Function to perform user login
const login = async (username: string, password: string) => {
  try {
    // Send a POST request to the SignIn endpoint with the provided username and password
    const response = await axios.post(API_URL + "SignIn", {
      username,
      password,
    });

    // If a token is present in the response data, store user information in local storage
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    // Return the response data
    return response.data;
  } catch (error) {
    // If an error occurs, log the error and return null
    console.error("Error during login:", error);
    return null;
  }
};

// Function to perform user logout
const logout = () => {
  // Remove the user information from local storage
  localStorage.removeItem("user");
};

// Function to retrieve the current logged-in user
const getCurrentUser = () => {
  // Retrieve user information from local storage
  const userStr = localStorage.getItem("user");

  // If user information exists, parse and return it
  if (userStr) return JSON.parse(userStr);

  // If no user information is found, return null
  return null;
};

// Object that encapsulates authentication service functions
const AuthService = {
  login,
  logout,
  getCurrentUser,
};

// Export the AuthService object as the default export for this module
export default AuthService;

