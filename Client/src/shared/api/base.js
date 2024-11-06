import axios from 'axios'
import { API_URL } from '@/shared/config'
import { tokenService } from '@/shared/lib/storage'
import { getCurrentPosition } from '@/shared/lib/geolocation'

const baseAPI = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

let refreshPromise = null

baseAPI.interceptors.request.use(
  async (config) => {
    const token = tokenService.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const position = await getCurrentPosition()
      config.headers['X-Location'] = `${position.latitude},${position.longitude}`
      config.headers['X-Timestamp'] = new Date().toISOString()
    } catch (error) {
      console.warn('Location access denied:', error)
    }

    return config
  },
  (error) => Promise.reject(error)
)

baseAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        if (!refreshPromise) {
          refreshPromise = axios.post(`${API_URL}/auth/refresh`, {
            refresh_token: tokenService.getRefreshToken()
          })
        }

        const response = await refreshPromise
        refreshPromise = null

        tokenService.setTokens(response.data)
        return baseAPI(originalRequest)
      } catch (refreshError) {
        refreshPromise = null
        tokenService.removeTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export { baseAPI }