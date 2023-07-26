import api from "./api";

export const search = (query) => api.get(`/users?search=${query}`)

export const update = (form) => api.put(`/users`, form)