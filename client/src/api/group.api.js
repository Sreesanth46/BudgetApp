import api from "./api";

export const createGroup = (form) => api.post(`/group`, form);

export const updateGroup = (form, id) => api.put(`/group/${id}`, form);

export const deleteGroup = (id) => api.delete(`/group/${id}`);
