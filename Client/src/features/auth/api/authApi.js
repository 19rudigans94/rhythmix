import { baseAPI } from '@/shared/api/base'
import { tokenService } from '@/shared/lib/cookies'

export const authAPI = {
  login: async (credentials) => {
    const { data } = await baseAPI.post('/auth/login', credentials)
    tokenService.setTokens(data.tokens)
    return data
  },

  register: async (userData) => {
    const { data } = await baseAPI.post('/auth/register', userData)
    tokenService.setTokens(data.tokens)
    return data
  },

  logout: async () => {
    const refreshToken = tokenService.getRefreshToken()
    await baseAPI.post('/auth/logout', { refreshToken })
    tokenService.removeTokens()
  },

  refreshToken: async () => {
    const refreshToken = tokenService.getRefreshToken()
    const { data } = await baseAPI.post('/auth/refresh', { refreshToken })
    tokenService.setTokens(data.tokens)
    return data
  },

  updateProfile: async (userData) => {
    const { data } = await baseAPI.put('/auth/profile', userData)
    return data
  }
}