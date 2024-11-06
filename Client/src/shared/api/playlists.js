import { baseAPI } from './base'

export const playlistsAPI = {
  getAll: () => 
    baseAPI.get('/playlists/'),
  
  getById: (id) => 
    baseAPI.get(`/playlists/${id}/`),
  
  create: () => 
    baseAPI.post('/create-user-playlists/'),
  
  update: (id, playlistData) => 
    baseAPI.put(`/playlists/${id}/`, playlistData),
  
  search: (query) => 
    baseAPI.get('/playlists/', { params: { search: query } }),
  
  importFromSpotify: (spotifyUrl) => 
    baseAPI.post('/import-playlist-spotify/', { url: spotifyUrl }),
  
  addTrack: (playlistId, trackId) => 
    baseAPI.post(`/playlists/${playlistId}/add-track/`, { track_id: trackId }),
  
  removeTrack: (playlistId, trackId) => 
    baseAPI.post(`/playlists/${playlistId}/remove-track/`, { track_id: trackId }),
  
  getDetails: () => 
    baseAPI.get('/detail-playlists/')
}