import { authAPI } from '@/shared/api'
import { tokenService } from '@/shared/lib/storage'

export const sessionAPI = {
  login: async (credentials) => {
    const { data } = await authAPI.login(credentials)
    tokenService.setTokens(data.tokens)
    return data
  },

  register: async (userData) => {
    const { data } = await authAPI.register(userData)
    tokenService.setTokens(data.tokens)
    return data
  },

  googleLogin: async () => {
    const { data } = await authAPI.googleLogin()
    return data.authUrl
  },

  googleCallback: async (code) => {
    const { data } = await authAPI.googleCallback(code)
    tokenService.setTokens(data.tokens)
    return data
  },

  getProfile: async () => {
    const { data } = await authAPI.getProfile()
    return data
  },

  uploadAvatar: async (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    const { data } = await authAPI.uploadAvatar(formData)
    return data
  }
}