import api from "./api";

export const createExpense = (form) => api.post(`/expense`, form);

export const listExpense = (groupId) => api.get(`/expense/${groupId}`);

export const updateExpense = (form, id) => api.put(`/expense/${id}`, form);

export const deleteExpense = (id) => api.delete(`/expense/${id}`);
