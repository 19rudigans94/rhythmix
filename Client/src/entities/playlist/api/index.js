import { playlistsAPI } from '@/shared/api'
import { APIError } from '@/shared/lib/api-error'

export const playlistAPI = {
  getAll: async () => {
    try {
      const { data } = await playlistsAPI.getAll()
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  getById: async (id) => {
    try {
      const { data } = await playlistsAPI.getById(id)
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  create: async (playlistData) => {
    try {
      const { data } = await playlistsAPI.create(playlistData)
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  update: async (id, playlistData) => {
    try {
      const { data } = await playlistsAPI.update(id, playlistData)
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  delete: async (id) => {
    try {
      await playlistsAPI.delete(id)
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  }
}