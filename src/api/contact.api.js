import api from './axios';

// Public - Submit contact form
export const submitContactForm = (data) => api.post('/contact', data);

// Admin - Get all contact messages with filters
export const getContacts = (params = {}) => api.get('/admin/contacts', { params });

// Admin - Get contact detail (auto marks as read)
export const getContactById = (id) => api.get(`/admin/contacts/${id}`);

// Admin - Update contact status
export const updateContactStatus = (id, status) => api.put(`/admin/contacts/${id}`, { status });

// Admin - Delete contact
export const deleteContact = (id) => api.delete(`/admin/contacts/${id}`);
