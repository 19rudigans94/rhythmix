import { baseAPI } from './base'

export const tracksAPI = {
  search: (query) => 
    baseAPI.get('/tracks/search', { params: { q: query } }),
  
  getById: (id) => 
    baseAPI.get(`/tracks/${id}`),
  
  like: (id) => 
    baseAPI.post(`/tracks/${id}/like`),
  
  unlike: (id) => 
    baseAPI.delete(`/tracks/${id}/like`),
  
  getLiked: () => 
    baseAPI.get('/tracks/liked'),
  
  getRecommended: () => 
    baseAPI.get('/tracks/recommended')
}