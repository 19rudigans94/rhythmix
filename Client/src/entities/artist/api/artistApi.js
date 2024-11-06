import { artistsAPI } from '@/shared/api'

export const artistAPI = {
  getAll: async () => {
    const { data } = await artistsAPI.getAll()
    return data
  },

  getById: async (id) => {
    const { data } = await artistsAPI.getById(id)
    return data
  },

  update: async (id, artistData) => {
    const { data } = await artistsAPI.update(id, artistData)
    return data
  },

  search: async (query) => {
    const { data } = await artistsAPI.search(query)
    return data
  },

  importFromSpotify: async (spotifyUrl) => {
    const { data } = await artistsAPI.importFromSpotify(spotifyUrl)
    return data
  }
}