import axios from "axios";

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: `${API_URL}/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Otomatis tambahkan Token ke Header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Comprehensive Error Handling Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    switch (status) {
      case 401:
        // Token tidak valid/expired - redirect ke login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        break;

      case 403:
        // Forbidden - user tidak punya akses
        console.error("[API] Forbidden: User does not have permission");
        error.isForbidden = true;
        break;

      case 422:
        // Validation errors - extract field errors for forms
        console.error("[API] Validation Error:", data?.errors);
        error.validationErrors = data?.errors || {};
        break;

      case 429:
        // Rate limit exceeded
        console.error(
          "[API] Rate limit exceeded. Please wait before retrying.",
        );
        error.isRateLimited = true;
        error.retryAfter = error.response?.headers?.["retry-after"];
        break;

      case 500:
        // Server error
        console.error("[API] Server Error:", data?.message);
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
