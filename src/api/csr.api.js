import api from "./axios";

export const getCsrs = (params = {}) => api.get("/csrs", { params });

export const getCsrById = (id) => api.get(`/csrs/${id}`);

export const createCsr = (data) => api.post("/csrs", data);

export const updateCsr = (id, data) => api.put(`/csrs/${id}`, data);

export const deleteCsr = (id) => api.delete(`/csrs/${id}`);
