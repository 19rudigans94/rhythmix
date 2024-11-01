import { baseAPI } from './base'

export const playlistsAPI = {
  getAll: () => 
    baseAPI.get('/playlists'),
  
  getById: (id) => 
    baseAPI.get(`/playlists/${id}`),
  
  create: (data) => 
    baseAPI.post('/playlists', data),
  
  update: (id, data) => 
    baseAPI.put(`/playlists/${id}`, data),
  
  delete: (id) => 
    baseAPI.delete(`/playlists/${id}`),
  
  addTrack: (playlistId, trackId) => 
    baseAPI.post(`/playlists/${playlistId}/tracks`, { trackId }),
  
  removeTrack: (playlistId, trackId) => 
    baseAPI.delete(`/playlists/${playlistId}/tracks/${trackId}`)
}