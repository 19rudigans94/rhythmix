import { tracksAPI } from '@/shared/api'
import { APIError } from '@/shared/lib/api-error'

export const trackAPI = {
  search: async (query) => {
    try {
      const { data } = await tracksAPI.search(query)
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  getById: async (id) => {
    try {
      const { data } = await tracksAPI.getById(id)
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  like: async (id) => {
    try {
      const { data } = await tracksAPI.like(id)
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  unlike: async (id) => {
    try {
      await tracksAPI.unlike(id)
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  getLiked: async () => {
    try {
      const { data } = await tracksAPI.getLiked()
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  }
}