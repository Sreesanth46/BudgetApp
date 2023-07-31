import api from "./api";

export const addMember = (form) => api.post(`/group-member`, form)

export const listMemberByGroup = (groupId) => api.get(`/group-member/${groupId}`)

export const deleteMember = (id) => api.delete(`/group-member/${id}`)