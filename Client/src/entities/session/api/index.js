import { authAPI } from '@/shared/api'
import { APIError } from '@/shared/lib/api-error'

export const sessionAPI = {
  login: async (credentials) => {
    try {
      const { data } = await authAPI.login(credentials)
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  register: async (userData) => {
    try {
      const { data } = await authAPI.register(userData)
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  getProfile: async () => {
    try {
      const { data } = await authAPI.getProfile()
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  updateProfile: async (userData) => {
    try {
      const { data } = await authAPI.updateProfile(userData)
      return data
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  },

  logout: async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      throw APIError.fromResponse(error)
    }
  }
}