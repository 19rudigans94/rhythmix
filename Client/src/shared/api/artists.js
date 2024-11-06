import { baseAPI } from './base'

export const artistsAPI = {
  getAll: () => 
    baseAPI.get('/artists/'),
  
  getById: (id) => 
    baseAPI.get(`/artists/${id}/`),
  
  update: (id, artistData) => 
    baseAPI.put(`/artists/${id}/`, artistData),
  
  search: (query) => 
    baseAPI.get('/artists/', { params: { search: query } }),
  
  importFromSpotify: (spotifyUrl) => 
    baseAPI.post('/import-artist-spotify/', { url: spotifyUrl })
}