/**
 * Application Configuration
 * Centralized configuration from environment variables
 *
 * Usage: import { config } from '@/config';
 */

// API Configuration
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";
export const API_BASE_URL = API_URL.replace("/api", ""); // Base URL without /api

// Storage URL for images
export const STORAGE_URL =
  import.meta.env.VITE_STORAGE_URL || `${API_BASE_URL}/storage`;

// TinyMCE
export const TINYMCE_API_KEY = import.meta.env.VITE_API_KEY_TINY || "";

// EmailJS Configuration
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
export const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

// Helper function to get full image URL
export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";

  // If path is an object, extract the actual path (API returns image_url)
  if (typeof path === "object") {
    path = path.image_url || path.image_path || path.path || path.url || "";
  }

  // Ensure path is a string
  if (typeof path !== "string") return "/placeholder.png";

  // AGGRESSIVE FIX: identifying the storage path segment
  // This handles http://localhost/storage (no port), relative /storage, etc.
  if (path.includes("/storage/") || path.includes("storage/")) {
    // Split by storage/ and take the last part
    const parts = path.split("storage/");
    const relativePart = parts[parts.length - 1];
    
    // Avoid double slash if relativePart starts with /
    const cleanerRelative = relativePart.replace(/^\/+/, "");
    return `${STORAGE_URL}/${cleanerRelative}`;
  }

  if (path.startsWith("http")) return path;

  // Remove leading slashes and 'storage/' prefix if present
  const cleanPath = path.replace(/^\/+/, "").replace(/^storage\//, "");
  return `${STORAGE_URL}/${cleanPath}`;
};

// Export as config object for convenience
export const config = {
  apiUrl: API_URL,
  apiBaseUrl: API_BASE_URL,
  storageUrl: STORAGE_URL,
  tinymceApiKey: TINYMCE_API_KEY,
  emailjs: {
    serviceId: EMAILJS_SERVICE_ID,
    templateId: EMAILJS_TEMPLATE_ID,
    publicKey: EMAILJS_PUBLIC_KEY,
  },
  getImageUrl,
};

export default config;
