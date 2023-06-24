import api from "./api";

export const login = (form) => api.post(`/login`, form)

export const verifyAccessToken = (form) => api.post(`/login/verify`, form)

export const refreshAccessToken = (form) => api.post(`/login/refresh`, form)