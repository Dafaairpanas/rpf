import api from "./axios";

/**
 * Auth API Module
 * Centralized authentication functions following API v1 contract
 */

// Login - POST /login
export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

// Logout - POST /logout
export const logout = async () => {
  try {
    await api.post("/logout");
  } finally {
    // Always clear local storage, even if API call fails
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

// Get Current User - GET /me
export const getMe = async () => {
  const response = await api.get("/me");
  return response.data;
};

// Helper to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Helper to get stored user
export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Helper to check if user has specific role
export const hasRole = (roleName) => {
  const user = getStoredUser();
  return user?.role?.name === roleName;
};

// Helper to check if user is Super Admin
export const isSuperAdmin = () => hasRole("Super Admin");
