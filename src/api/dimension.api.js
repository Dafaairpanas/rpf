import api from "./axios";

export const getDimensions = (params = {}) =>
  api.get("/dimensions", { params });

export const getDimensionById = (id) => api.get(`/dimensions/${id}`);

export const createDimension = (data) => api.post("/dimensions", data);

export const updateDimension = (id, data) => api.put(`/dimensions/${id}`, data);

export const deleteDimension = (id) => api.delete(`/dimensions/${id}`);
