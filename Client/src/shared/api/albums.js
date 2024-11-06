import { baseAPI } from './base'

export const albumsAPI = {
  create: (albumData) => 
    baseAPI.post('/albums-create/', albumData),
  
  getById: (id) => 
    baseAPI.get(`/albums/${id}/`),
  
  update: (id, albumData) => 
    baseAPI.put(`/albums/${id}/`, albumData),
  
  search: (query) => 
    baseAPI.get('/albums-create/', { params: { search: query } }),
  
  importFromSpotify: (spotifyUrl) => 
    baseAPI.post('/import-album-spotify/', { url: spotifyUrl })
}