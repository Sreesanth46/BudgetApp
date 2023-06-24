import api from "./api";

export const register = (form) => api.post(`/register/`, form)

export const signUp = (token, form) => api.post(`/register/signUp?token=${token}`, form)