import api from "./axios";

// Public - Get active banners
export const getBanners = () => api.get("/banners");

// Admin - Get all banners with pagination
export const getAdminBanners = (params = {}) =>
  api.get("/admin/banners", { params });

// Admin - Create banner
export const createBanner = (data) =>
  api.post("/admin/banners", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Admin - Update banner
export const updateBanner = (id, data) =>
  api.post(`/admin/banners/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Admin - Delete banner
export const deleteBanner = (id) => api.delete(`/admin/banners/${id}`);
