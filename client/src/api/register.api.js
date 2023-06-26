import api from "./api";

export const register = (form) => api.post(`/register`, form)

export const signUp = (form, token) => api.post(`/register/signUp?token=${token}`, form)