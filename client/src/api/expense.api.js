import api from "./api";

export const createExpense = (form) => api.post(`/expense`, form);

export const listExpenseByGroup = (groupId) => api.get(`/expense/group/${groupId}`);

export const listAllExpense = () => api.get(`/expense/all`);

export const findExpenseById = (id) => api.get(`/expense/id/${id}`);

export const updateExpense = (form, id) => api.put(`/expense/${id}`, form);

export const deleteExpense = (id) => api.delete(`/expense/${id}`);
