import { baseAPI } from './base'

export const tracksAPI = {
  search: (query) => 
    baseAPI.get('/tracks/', { params: { search: query } }),
  
  importFromSpotify: (spotifyUrl) => 
    baseAPI.post('/import-track-spotify/', { url: spotifyUrl })
}