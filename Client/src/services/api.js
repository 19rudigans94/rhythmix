import axios from 'axios'
import { tokenService } from '@/shared/lib/cookies'
import { API_URL } from '@/shared/config'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(async (config) => {
  const token = tokenService.getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    if (response.config?.url?.endsWith('/playlists') && !Array.isArray(response.data)) {
      return { ...response, data: [] }
    }
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      tokenService.removeTokens()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api