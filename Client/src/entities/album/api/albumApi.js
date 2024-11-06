import { albumsAPI } from '@/shared/api'

export const albumAPI = {
  create: async (albumData) => {
    const { data } = await albumsAPI.create(albumData)
    return data
  },

  getById: async (id) => {
    const { data } = await albumsAPI.getById(id)
    return data
  },

  update: async (id, albumData) => {
    const { data } = await albumsAPI.update(id, albumData)
    return data
  },

  search: async (query) => {
    const { data } = await albumsAPI.search(query)
    return data
  },

  importFromSpotify: async (spotifyUrl) => {
    const { data } = await albumsAPI.importFromSpotify(spotifyUrl)
    return data
  }
}