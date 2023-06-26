import api from "./api";

export const createExpenseSplit = (form) => api.post(`/expense-split`, form);

export const markAsPaid = (id) => api.put(`/expense-split/paid/${id}`);

export const verifyAsPaid = (id) => api.put(`/expense-split/verify-paid/${id}`);