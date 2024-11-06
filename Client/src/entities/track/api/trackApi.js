import { tracksAPI } from '@/shared/api'

export const trackAPI = {
  search: async (query) => {
    const { data } = await tracksAPI.search(query)
    return data
  },

  importFromSpotify: async (spotifyUrl) => {
    const { data } = await tracksAPI.importFromSpotify(spotifyUrl)
    return data
  }
}