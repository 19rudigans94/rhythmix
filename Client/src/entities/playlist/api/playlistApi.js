import { playlistsAPI } from '@/shared/api'

export const playlistAPI = {
  getAll: async () => {
    const { data } = await playlistsAPI.getAll()
    return data
  },

  getById: async (id) => {
    const { data } = await playlistsAPI.getById(id)
    return data
  },

  create: async () => {
    const { data } = await playlistsAPI.create()
    return data
  },

  update: async (id, playlistData) => {
    const { data } = await playlistsAPI.update(id, playlistData)
    return data
  },

  search: async (query) => {
    const { data } = await playlistsAPI.search(query)
    return data
  },

  importFromSpotify: async (spotifyUrl) => {
    const { data } = await playlistsAPI.importFromSpotify(spotifyUrl)
    return data
  },

  addTrack: async (playlistId, trackId) => {
    const { data } = await playlistsAPI.addTrack(playlistId, trackId)
    return data
  },

  removeTrack: async (playlistId, trackId) => {
    const { data } = await playlistsAPI.removeTrack(playlistId, trackId)
    return data
  },

  getDetails: async () => {
    const { data } = await playlistsAPI.getDetails()
    return data
  }
}